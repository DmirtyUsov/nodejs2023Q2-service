import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MydbModule } from './mydb/mydb.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, MydbModule],
})
export class AppModule {}
