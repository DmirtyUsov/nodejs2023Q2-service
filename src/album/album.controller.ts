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
  getAllAlbums(): AlbumDto[] {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getSingleAlbumById(@Param('id', new ParseUUIDPipe()) id: string): AlbumDto {
    return this.albumService.getSingleAlbumById(id);
  }

  @Post()
  createNewAlbum(@Body() dto: CreateAlbumDto): AlbumDto {
    return this.albumService.createAlbum(dto);
  }

  @Put(':id')
  updateAlbumInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateAlbumDto,
  ): AlbumDto {
    return this.albumService.updateAlbumInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.albumService.deleteAlbum(id);
  }
}
