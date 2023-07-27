import { Injectable } from '@nestjs/common';
import { MydbService } from 'src/mydb/mydb.service';
import { CreateUserDto, UserDto } from './dto';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(private mydb: MydbService) {}

  getAllUsers() {
    return this.mydb.user.list();
  }
  getSingleUserById() {}

  createUser(dto: CreateUserDto) {
    const newUser: UserDto = {
      id: uuid.v4(),
      login: dto.login,
      password: dto.password,
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    // generate the password hash

    // save user to db

    // return saved user
    return this.mydb.user.create(newUser);
  }

  updateUserPassword() {}

  deleteUser() {}
}
