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
import { AlbumService } from './album.service';
import { AlbumDto, CreateAlbumDto } from './dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAllAlbums(): Promise<AlbumDto[]> {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getSingleAlbumById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<AlbumDto> {
    return await this.albumService.getSingleAlbumById(id);
  }

  @Post()
  async createNewAlbum(@Body() dto: CreateAlbumDto): Promise<AlbumDto> {
    return await this.albumService.createAlbum(dto);
  }

  @Put(':id')
  async updateAlbumInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateAlbumDto,
  ): Promise<AlbumDto> {
    return this.albumService.updateAlbumInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.albumService.deleteAlbum(id);
  }
}
