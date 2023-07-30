import { Injectable, NotFoundException } from '@nestjs/common';
import { MydbService } from 'src/mydb/mydb.service';
import { AlbumDto, CreateAlbumDto } from './dto';
import * as uuid from 'uuid';

@Injectable()
export class AlbumService {
  private MSG_NOTFOUND = 'Album doesn not exist';
  constructor(private mydb: MydbService) {}

  getAllAlbums() {
    return this.mydb.album.list();
  }

  getSingleAlbumById(id: string) {
    const result = this.mydb.album.getById(id);
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    return result;
  }

  createAlbum(dto: CreateAlbumDto) {
    const newAlbum: AlbumDto = {
      id: uuid.v4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    return this.mydb.album.create(newAlbum);
  }

  updateAlbumInfo(id: string, dto: CreateAlbumDto): AlbumDto {
    // find
    const result = this.mydb.album.getById(id);
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    result.name = dto.name;
    result.year = dto.year;
    result.artistId = dto.artistId;
    return this.mydb.album.update(id, result);
  }

  deleteAlbum(id: string) {
    const result = this.mydb.album.delete(id);
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    this.mydb.cleanAlbum(id);
    return result;
  }
}
