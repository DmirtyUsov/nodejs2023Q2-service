import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CredentialUserDto } from 'src/user/dto';
import { AuthDto } from './dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtOptions: JwtSignOptions;
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {
    this.jwtOptions = {
      secret: this.config.get('JWT_SECRET_KEY'),
      expiresIn: this.config.get('TOKEN_EXPIRE_TIME'),
    };
  }

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
    return await this.signToken(result.id, result.login);
  }

  async refresh() {
    return 'refresh';
  }

  async signToken(userId: string, userLogin: string): Promise<AuthDto> {
    const payload = {
      sub: userId,
      userLogin,
    };
    const token = await this.jwt.signAsync(payload, this.jwtOptions);
    return { token };
  }
}
