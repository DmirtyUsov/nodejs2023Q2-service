import { ArtistDto } from 'src/artist/dto';
import { MyDB } from './my.db';

export class ArtistDB extends MyDB<ArtistDto> {
  create(dto: ArtistDto): ArtistDto {
    this.add(dto.id, dto);
    return dto;
  }
}
