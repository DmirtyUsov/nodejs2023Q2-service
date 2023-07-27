import { Injectable } from '@nestjs/common';
import { UserDB } from './user.db';

@Injectable()
export class MydbService {
  user = new UserDB();
}
