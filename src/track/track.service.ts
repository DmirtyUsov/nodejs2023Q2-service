import { Injectable, NotFoundException } from '@nestjs/common';
import { MydbService } from 'src/mydb/mydb.service';
import { CreateTrackDto, TrackDto } from './dto';
import * as uuid from 'uuid';

@Injectable()
export class TrackService {
  private MSG_NOTFOUND = 'Track doesn not exist';
  constructor(private mydb: MydbService) {}

  getAllTracks() {
    return this.mydb.track.list();
  }

  getSingleTrackById(id: string) {
    const result = this.mydb.track.getById(id);
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    return result;
  }

  createTrack(dto: CreateTrackDto) {
    const newTrack: TrackDto = {
      id: uuid.v4(),
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId,
      albumId: dto.albumId,
    };
    return this.mydb.track.create(newTrack);
  }

  updateTrackInfo(id: string, dto: CreateTrackDto): TrackDto {
    // find
    const result = this.mydb.track.getById(id);
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    result.name = dto.name;
    result.duration = dto.duration;
    result.artistId = dto.artistId;
    result.albumId = dto.albumId;
    return this.mydb.track.update(id, result);
  }

  deleteTrack(id: string) {
    const result = this.mydb.track.delete(id);
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    return result;
  }
}
