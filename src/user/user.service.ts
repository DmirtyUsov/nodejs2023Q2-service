import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaQueryError } from 'src/prisma/errorcodes';

@Injectable()
export class UserService {
  private MSG_NOTFOUND = 'User does not exist';
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.prisma.extended.user.findMany();
    return users.map((item) => new UserDto(item)); // For @Exclude correct working
  }

  async getSingleUserById(id: string): Promise<UserDto> {
    const result = await this.prisma.extended.user.findUnique({
      where: { id: id },
    });

    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    return new UserDto(result);
  }

  async createUser(dto: CreateUserDto): Promise<UserDto> {
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
      return new UserDto(result);
    }
  }

  async updateUser(id: string, dto: UpdatePasswordDto): Promise<UserDto> {
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
    return new UserDto(result);
  }

  async deleteUser(id: string): Promise<UserDto> {
    try {
      const result = await this.prisma.extended.user.delete({
        where: { id: id },
      });
      return new UserDto(result);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == PrismaQueryError.RecordsNotFound) {
          throw new NotFoundException(this.MSG_NOTFOUND);
        }
      }
      throw error;
    }
  }
}
