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
import { AuthUserId } from 'src/auth/decorators';

@Controller('favs')
export class FavoritesController {
  constructor(private favsService: FavoritesService) {}

  @Get()
  async getFavs(@AuthUserId() userId: string): Promise<FavoritesResponseDto> {
    return await this.favsService.getFavs(userId);
  }

  @Post('/track/:id')
  async addTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUserId() userId: string,
  ): Promise<void> {
    await this.favsService.addTrack(id, userId);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUserId() userId: string,
  ): Promise<void> {
    await this.favsService.deleteTrack(id, userId);
  }

  @Post('/artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUserId() userId: string,
  ): Promise<void> {
    await this.favsService.addArtist(id, userId);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUserId() userId: string,
  ): Promise<void> {
    await this.favsService.deleteArtist(id, userId);
  }

  @Post('/album/:id')
  async addAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUserId() userId: string,
  ): Promise<void> {
    await this.favsService.addAlbum(id, userId);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @AuthUserId() userId: string,
  ): Promise<void> {
    await this.favsService.deleteAlbum(id, userId);
  }
}
