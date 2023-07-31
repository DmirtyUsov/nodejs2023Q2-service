import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto, CreateArtistDto } from './dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllArtists(): ArtistDto[] {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  getSingleArtistById(@Param('id', new ParseUUIDPipe()) id: string): ArtistDto {
    return this.artistService.getSingleArtistById(id);
  }

  @Post()
  createArtist(@Body() dto: CreateArtistDto): ArtistDto {
    return this.artistService.createArtist(dto);
  }

  @Put(':id')
  updateArtistInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateArtistDto,
  ): ArtistDto {
    return this.artistService.updateArtistInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.artistService.deleteArtist(id);
  }
}
