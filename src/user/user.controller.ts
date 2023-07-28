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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): UserDto[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getSingleUserById(@Param('id', new ParseUUIDPipe()) id: string) : UserDto {
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
      return result;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) : UserDto {
    const result = this.userService.deleteUser(id);
    if (!result) {
      throw new NotFoundException('User doesn not exist');
    } else {
      return result;
    }
  }
}
