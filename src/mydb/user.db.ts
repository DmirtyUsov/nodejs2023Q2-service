import { UserDto } from 'src/user/dto';
import { MyDB } from './my.db';

export class UserDB extends MyDB<UserDto>{

  create(dto: UserDto): UserDto {
    if (this.findByLogin(dto.login)) {
      return null;
    }
    this.add(dto.id, dto);
    return dto;
  }

  findByLogin(login: string): UserDto {
    let result: UserDto = null;
    this.list().every(item => {
      if(item.login === login) {
        result = item;
        return false; // stop 
      }
      return true; // continue
    })
    return result;
  }

}
