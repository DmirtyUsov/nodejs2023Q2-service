import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MydbService } from 'src/mydb/mydb.service';
import { FavRecords, FavoritesResponseDto } from './dto';

@Injectable()
export class FavoritesService {
  private MSG_NOTFOUND = 'ID does not exist in';
  constructor(private mydb: MydbService) {}

  getFavs(): FavoritesResponseDto {
    const result: FavoritesResponseDto = {
      albums: [],
      artists: [],
      tracks: [],
    };

    const artists = this.mydb.favs.list(FavRecords.artists);
    console.log({ artists });
    artists.forEach((id) => {
      result.artists.push(this.mydb.artist.getById(id));
    });

    const albums = this.mydb.favs.list(FavRecords.albums);
    albums.forEach((id) => {
      result.albums.push(this.mydb.album.getById(id));
    });

    const tracks = this.mydb.favs.list(FavRecords.tracks);
    tracks.forEach((id) => {
      result.tracks.push(this.mydb.track.getById(id));
    });

    return result;
  }

  addArtist(id: string): void {
    const result = this.mydb.artist.getById(id);
    if (!result) {
      throw new UnprocessableEntityException(`${this.MSG_NOTFOUND} in Artists`);
    }
    this.mydb.favs.add(FavRecords.artists, id);
  }

  deleteArtist(id: string): void {
    const result = this.mydb.favs.delete(FavRecords.artists, id);
    if (!result) {
      throw new NotFoundException(`${this.MSG_NOTFOUND} in Artists Favs`);
    }
  }

  addTrack(id: string): void {
    const result = this.mydb.track.getById(id);
    if (!result) {
      throw new UnprocessableEntityException(`${this.MSG_NOTFOUND} in Tracks`);
    }
    this.mydb.favs.add(FavRecords.tracks, id);
  }

  deleteTrack(id: string): void {
    const result = this.mydb.favs.delete(FavRecords.tracks, id);
    if (!result) {
      throw new NotFoundException(`${this.MSG_NOTFOUND} in Tracks Favs`);
    }
  }

  addAlbum(id: string): void {
    const result = this.mydb.album.getById(id);
    if (!result) {
      throw new UnprocessableEntityException(`${this.MSG_NOTFOUND} in Albums`);
    }
    this.mydb.favs.add(FavRecords.albums, id);
  }

  deleteAlbum(id: string): void {
    const result = this.mydb.favs.delete(FavRecords.albums, id);
    if (!result) {
      throw new NotFoundException(`${this.MSG_NOTFOUND} in Albums Favs`);
    }
  }
}
