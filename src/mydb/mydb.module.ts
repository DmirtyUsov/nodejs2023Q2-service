import { Global, Module } from '@nestjs/common';
import { MydbService } from './mydb.service';

@Global()
@Module({
  providers: [MydbService],
  exports: [MydbService],
})
export class MydbModule {}
