import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MydbService } from 'src/mydb/mydb.service';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './dto';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  private MSG_NOTFOUND = 'User does not exist';
  constructor(private mydb: MydbService) {}

  getAllUsers() {
    return this.mydb.user.list();
  }

  getSingleUserById(id: string) {
    const result = this.mydb.user.getById(id);
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    return result;
  }

  createUser(dto: CreateUserDto) {
    const newUser = new UserDto();
    newUser.id = uuid.v4();
    newUser.login = dto.login;
    newUser.version = 1;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();
    newUser.password = dto.password;
    // generate the password hash

    // save user to db
    // return saved user
    const result = this.mydb.user.create(newUser);
    if (!result) {
      throw new ForbiddenException('User exists');
    } else {
      return result;
    }
  }

  updateUser(id: string, dto: UpdatePasswordDto): UserDto {
    const result = this.mydb.user.getById(id);
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    } else {
      // check password
      if (dto.oldPassword !== result.password) {
        throw new ForbiddenException('oldPassword is wrong');
      }
      // update password
      result.password = dto.newPassword;
      result.updatedAt = Date.now();
      result.version += 1;
      // const result = this.mydb.user.update(dto.id, dto);
    }
    return result;
  }

  deleteUser(id: string): UserDto {
    const result = this.mydb.user.delete(id);
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    } else {
      return result;
    }
  }
}
