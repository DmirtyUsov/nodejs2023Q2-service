import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialUserDto } from 'src/user/dto';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CredentialUserDto): Promise<AuthDto> {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login() {
    return this.authService.login();
  }

  @Post('refresh')
  async refresh() {
    return this.authService.refresh();
  }
}
