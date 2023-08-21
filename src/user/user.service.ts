import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CredentialUserDto, UpdatePasswordDto, UserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaQueryError } from 'src/prisma/errorcodes';
import { compare, genSalt, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private MSG_NOTFOUND = 'User does not exist';
  private saltRounds: number;
  constructor(private prisma: PrismaService, private config: ConfigService) {
    this.saltRounds = +config.get('CRYPT_SALT');
  }

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

  async createUser(dto: CredentialUserDto): Promise<UserDto> {
    const salt = await genSalt(this.saltRounds);
    const passwordHash = await hash(dto.password, salt);
    const result = await this.prisma.extended.user.create({
      data: {
        login: dto.login,
        password: passwordHash,
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
      const isHashesSame = await compare(dto.oldPassword, result.password);
      if (!isHashesSame) {
        throw new ForbiddenException('oldPassword is wrong');
      }
      const salt = await genSalt(this.saltRounds);
      const passwordHash = await hash(dto.newPassword, salt);

      result = await this.prisma.extended.user.update({
        where: { id: id },
        data: {
          password: passwordHash,
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
