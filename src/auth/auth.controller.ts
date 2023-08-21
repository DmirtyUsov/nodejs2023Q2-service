import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialUserDto } from 'src/user/dto';
import { AuthDto } from './dto';
import { StatusCodes } from 'http-status-codes';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: CredentialUserDto): Promise<AuthDto> {
    return await this.authService.login(dto);
  }

  @HttpCode(StatusCodes.NO_CONTENT)
  @Post('signup')
  async signup(@Body() dto: CredentialUserDto): Promise<void> {
    await this.authService.signup(dto);
  }
  @Post('refresh')
  async refresh() {
    return this.authService.refresh();
  }
}
