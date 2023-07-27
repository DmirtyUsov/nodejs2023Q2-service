import { Injectable } from '@nestjs/common';
import { MydbService } from 'src/mydb/mydb.service';

@Injectable()
export class UserService {
  constructor(private mydb: MydbService) {}

  getAllUsers() {
    return { msg: 'GetAll' };
  }
  getSingleUserById() {}

  createUser() {
    return { msg: 'new User' };
  }

  updateUserPassword() {}

  deleteUser() {}
}
