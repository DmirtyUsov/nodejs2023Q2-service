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
import { TrackService } from './track.service';
import { CreateTrackDto, TrackDto } from './dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAllTracks(): TrackDto[] {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getSingleTrackById(@Param('id', new ParseUUIDPipe()) id: string): TrackDto {
    return this.trackService.getSingleTrackById(id);
  }

  @Post()
  createNewTrack(@Body() dto: CreateTrackDto): TrackDto {
    return this.trackService.createTrack(dto);
  }

  @Put(':id')
  updateTrackInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateTrackDto,
  ): TrackDto {
    return this.trackService.updateTrackInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.trackService.deleteTrack(id);
  }
}
