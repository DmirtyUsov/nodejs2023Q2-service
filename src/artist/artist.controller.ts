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
  async getAllArtists(): Promise<ArtistDto[]> {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  async getSingleArtistById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ArtistDto> {
    return await this.artistService.getSingleArtistById(id);
  }

  @Post()
  async createArtist(@Body() dto: CreateArtistDto): Promise<ArtistDto> {
    return await this.artistService.createArtist(dto);
  }

  @Put(':id')
  async updateArtistInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateArtistDto,
  ): Promise<ArtistDto> {
    return await this.artistService.updateArtistInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.artistService.deleteArtist(id);
  }
}
