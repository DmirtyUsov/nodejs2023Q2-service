import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponseDto } from './dto';

@Controller('favs')
export class FavoritesController {
  constructor(private favsService: FavoritesService) {}

  @Get()
  async getFavs(): Promise<FavoritesResponseDto> {
    return await this.favsService.getFavs();
  }

  @Post('/track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.favsService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favsService.deleteTrack(id);
  }

  @Post('/artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.favsService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favsService.deleteArtist(id);
  }

  @Post('/album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.favsService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.favsService.deleteAlbum(id);
  }
}
