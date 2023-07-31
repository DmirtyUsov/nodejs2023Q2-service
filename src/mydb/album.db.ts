import { AlbumDto } from 'src/album/dto';
import { MyDB } from './my.db';

export class AlbumDB extends MyDB<AlbumDto> {
  create(dto: AlbumDto): AlbumDto {
    this.add(dto.id, dto);
    return dto;
  }
}
