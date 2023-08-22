import { Body, ClassSerializerInterceptor, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialUserDto, UserDto } from 'src/user/dto';
import { AuthDto } from './dto';
import { StatusCodes } from 'http-status-codes';
import { Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: CredentialUserDto): Promise<AuthDto> {
    return await this.authService.login(dto);
  }

  @Public()
  @HttpCode(StatusCodes.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Body() dto: CredentialUserDto): Promise<UserDto> {
    return await this.authService.signup(dto);
  }
  @Post('refresh')
  async refresh() {
    return this.authService.refresh();
  }
}
