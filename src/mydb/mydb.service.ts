import { Injectable } from '@nestjs/common';
import { UserDB } from './user.db';
import { ArtistDB } from './artist.db';

@Injectable()
export class MydbService {
  user = new UserDB();
  artist = new ArtistDB();
}
