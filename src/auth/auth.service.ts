import { Injectable } from '@nestjs/common';
import { CredentialUserDto } from 'src/user/dto';
import { AuthDto } from './dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(dto: CredentialUserDto): Promise<AuthDto> {
    const result = await this.userService.createUser(dto);
    return { token: 'Your Token' };
  }

  async login() {
    return 'login';
  }

  async refresh() {
    return 'refresh';
  }
}
