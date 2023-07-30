import { Injectable } from '@nestjs/common';
import { UserDB } from './user.db';
import { ArtistDB } from './artist.db';
import { AlbumDB } from './album.db';

@Injectable()
export class MydbService {
  user = new UserDB();
  artist = new ArtistDB();
  album = new AlbumDB();
}
