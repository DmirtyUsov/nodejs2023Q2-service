import { Injectable, NotFoundException } from '@nestjs/common';
import { MydbService } from 'src/mydb/mydb.service';
import { ArtistDto, CreateArtistDto } from './dto';
import * as uuid from 'uuid';

@Injectable()
export class ArtistService {
    constructor(private mydb: MydbService) {}

  getAllArtists() {
    return this.mydb.artist.list();
  }
  getSingleArtistById(id: string) {
    const result = this.mydb.artist.getById(id);
    if(!result) {
        throw new NotFoundException('User doesn not exist');
    }
    return result;
  }

  createArtist(dto: CreateArtistDto) {
    const newArtist: ArtistDto = {
      id: uuid.v4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    return this.mydb.artist.create(newArtist);
  }

  updateArtistInfo(id: string, dto: CreateArtistDto): ArtistDto {
    // find artist
    const result = this.mydb.artist.getById(id);
    if (!result) {
      throw new NotFoundException('User does not exist');
    }
    result.name = dto.name;
    result.grammy = dto.grammy;
    return this.mydb.artist.update(id, result);
  }

  deleteArtist(id: string) {
    const result = this.mydb.artist.delete(id);
    if(!result) {
        throw new NotFoundException('User doesn not exist');
    }
    return result;
  }
}
