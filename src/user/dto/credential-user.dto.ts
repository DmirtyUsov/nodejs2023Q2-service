import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
