import { UserDto } from 'src/user/dto';

type dbUser = { [id: string]: UserDto };
export class UserDB {
  private users: dbUser;

  constructor() {
    this.users = {};
  }

  create(dto: UserDto): UserDto {
    if (this.findByLogin(dto.login)) {
      return null;
    }
    this.users[dto.id] = dto;
    return dto;
  }

  list(): UserDto[] {
    return Object.values(this.users);
  }

  getById(id: string): UserDto {
    const user: UserDto = this.users[id];
    return user;
  }

  findByLogin(login: string): UserDto {
    let result: UserDto = null;
    for (const value of Object.values(this.users)) {
      if (login === value.login) {
        result = value;
        break;
      }
    }
    return result;
  }

  delete(id: string): UserDto {
    const result = this.getById(id);
    if (result) {
      delete this.users[result.id];
    }
    return result;
  }
  update(dto: UserDto): UserDto {
    const result = this.getById(dto.id);
    if (result) {
      this.users[result.id] = dto;
    }
    return result;
  }
}
