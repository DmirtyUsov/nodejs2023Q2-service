import { Injectable } from '@nestjs/common';
import { UserDB } from './user.db';
import { ArtistDB } from './artist.db';
import { AlbumDB } from './album.db';
import { TrackDB } from './track.db';
import { FavoritesDB } from './favorites.db';
import { FavRecords } from 'src/favorites/dto';

@Injectable()
export class MydbService {
  user = new UserDB();
  artist = new ArtistDB();
  album = new AlbumDB();
  track = new TrackDB();
  favs = new FavoritesDB();

  cleanArtist(id: string): void {
    this.favs.delete(FavRecords.artists, id);
    const albums = this.album.list();
    albums.forEach((item) => {
      if (item.artistId === id) {
        item.artistId = null;
        this.album.update(item.id, item);
      }
    });
    const tracks = this.track.list();
    tracks.forEach((item) => {
      if (item.artistId === id) {
        item.artistId = null;
        this.track.update(item.id, item);
      }
    });
  }

  cleanAlbum(id: string): void {
    this.favs.delete(FavRecords.albums, id);
    const tracks = this.track.list();
    tracks.forEach((item) => {
      if (item.albumId === id) {
        item.albumId = null;
        this.track.update(item.id, item);
      }
    });
  }

  cleanTrack(id: string): void {
    this.favs.delete(FavRecords.tracks, id);
  }
}
