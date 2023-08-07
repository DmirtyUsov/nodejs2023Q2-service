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
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users.map((user) => new UserDto(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getSingleUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return new UserDto(await this.userService.getSingleUserById(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return new UserDto(await this.userService.createUser(dto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.userService.deleteUser(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUserPassword(
    @Body() dto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return new UserDto(await this.userService.updateUser(id, dto));
  }
}
