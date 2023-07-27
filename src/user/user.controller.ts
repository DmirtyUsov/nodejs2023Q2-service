import { Body, Controller, ForbiddenException, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    const result = this.userService.createUser(dto);
    if(!result) {
      throw new ForbiddenException('User exists');
    }
    else{
      return result;
    }
  }
}
