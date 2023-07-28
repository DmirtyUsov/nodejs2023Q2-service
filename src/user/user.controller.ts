import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): UserDto[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getSingleUserById(@Param('id', new ParseUUIDPipe()) id: string): UserDto {
    const result = this.userService.getSingleUserById(id);
    if (!result) {
      throw new NotFoundException('User doesn not exist');
    } else {
      return result;
    }
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    const result = this.userService.createUser(dto);
    if (!result) {
      throw new ForbiddenException('User exists');
    } else {
      delete result.password; // TODO
      return result;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string): UserDto {
    const result = this.userService.deleteUser(id);
    if (!result) {
      throw new NotFoundException('User doesn not exist');
    } else {
      return result;
    }
  }

  @Put(':id')
  updateUserPassword(
    @Body() dto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): UserDto {
    //find user
    const result = this.userService.getSingleUserById(id);
    if (!result) {
      throw new NotFoundException('User does not exist');
    } else {
      // check password
      if (dto.oldPassword !== result.password) {
        throw new ForbiddenException('oldPassword is wrong');
      }
      // update password
      result.password = dto.newPassword;
      result.updatedAt = Date.now();
      result.version += 1;
      return this.userService.updateUser(result);
    }
  }
}
