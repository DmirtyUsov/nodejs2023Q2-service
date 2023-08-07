import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  private MSG_NOTFOUND = 'User does not exist';
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.extended.user.findMany();
  }

  async getSingleUserById(id: string) {
    const result = await this.prisma.extended.user.findUnique({
      where: { id: id },
    });

    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    return result;
  }

  async createUser(dto: CreateUserDto) {
    // TODO generate the password hash
    const result = await this.prisma.extended.user.create({
      data: {
        login: dto.login,
        password: dto.password,
      },
    });
    if (!result) {
      throw new ForbiddenException('User exists');
    } else {
      return result;
    }
  }

  async updateUser(id: string, dto: UpdatePasswordDto) {
    let result = await this.prisma.extended.user.findUnique({
      where: { id: id },
    });
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    } else {
      // check password
      if (dto.oldPassword !== result.password) {
        throw new ForbiddenException('oldPassword is wrong');
      }

      result = await this.prisma.extended.user.update({
        where: { id: id },
        data: {
          password: dto.newPassword,
          version: { increment: 1 },
        },
      });
    }
    return result;
  }

  async deleteUser(id: string) {
    try {
      const result = await this.prisma.user.delete({
        where: { id: id },
      });
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2025') {
          // An operation failed because it depends on one or more records
          // that were required but not found
          throw new NotFoundException(this.MSG_NOTFOUND);
        }
      }
      throw error;
    }
  }
}
