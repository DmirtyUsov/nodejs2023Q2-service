import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CredentialUserDto } from 'src/user/dto';
import { AuthDto } from './dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(dto: CredentialUserDto): Promise<void> {
    const loginInDb = await this.userService.getUserByLogin(dto.login);
    if (loginInDb) {
      throw new ConflictException('Login exists');
    }
    await this.userService.createUser(dto);
  }

  async login(dto: CredentialUserDto): Promise<AuthDto> {
    const result = await this.userService.getUserByLogin(dto.login);
    if (!result) {
      throw new ForbiddenException('No user');
    }
    const isHashesSame = await compare(dto.password, result.password);
    if (!isHashesSame) {
      throw new ForbiddenException('Wrong password');
    }
    return { token: result.id };
  }

  async refresh() {
    return 'refresh';
  }
}
