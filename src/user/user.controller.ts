import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllUsers(): UserDto[] {
    return this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getSingleUserById(@Param('id', new ParseUUIDPipe()) id: string): UserDto {
    const result = this.userService.getSingleUserById(id);
    if (!result) {
      throw new NotFoundException('User doesn not exist');
    } else {
      return result;
    }
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    const result = this.userService.createUser(dto);
    if (!result) {
      throw new ForbiddenException('User exists');
    } else {
      return result;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
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
