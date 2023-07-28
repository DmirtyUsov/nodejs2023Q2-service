import { Injectable } from '@nestjs/common';
import { MydbService } from 'src/mydb/mydb.service';
import { CreateUserDto, UserDto } from './dto';
import * as uuid from 'uuid';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private mydb: MydbService) {}

  getAllUsers() {
    return this.mydb.user.list();
  }
  getSingleUserById(id: string) {
    return this.mydb.user.getById(id);
  }

  createUser(dto: CreateUserDto) {
    const newUser: UserDto = {
      id: uuid.v4(),
      login: dto.login,
      password: '',
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    newUser.password = dto.password;
    // generate the password hash

    // save user to db
    // return saved user
    return this.mydb.user.create(newUser);
  }

  updateUser(dto: UserDto): UserDto {
    const result = this.mydb.user.update(dto);
    return result;
  }

  deleteUser(id: string) {
    return this.mydb.user.delete(id);
  }
}
