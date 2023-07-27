import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MydbModule } from './mydb/mydb.module';

@Module({
  imports: [UserModule, MydbModule],
})
export class AppModule {}
