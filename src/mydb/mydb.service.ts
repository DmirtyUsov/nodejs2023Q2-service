import { Injectable } from '@nestjs/common';
import { UserDB } from './user.db';
import { ArtistDB } from './artist.db';
import { AlbumDB } from './album.db';
import { TrackDB } from './track.db';
import { FavoritesDB } from './favorites.db';

@Injectable()
export class MydbService {
  user = new UserDB();
  artist = new ArtistDB();
  album = new AlbumDB();
  track = new TrackDB();
  favs = new FavoritesDB();
}
