import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
    return this.userService.getSingleUserById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.userService.deleteUser(id);
  }

  @Put(':id')
  updateUserPassword(
    @Body() dto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): UserDto {
    return this.userService.updateUser(id, dto);
  }
}
