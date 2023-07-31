import { TrackDto } from 'src/track/dto';
import { MyDB } from './my.db';

export class TrackDB extends MyDB<TrackDto> {
  create(dto: TrackDto): TrackDto {
    this.add(dto.id, dto);
    return dto;
  }
}
