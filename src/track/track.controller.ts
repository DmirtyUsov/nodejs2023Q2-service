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
  async getAllTracks(): Promise<TrackDto[]> {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getSingleTrackById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<TrackDto> {
    return await this.trackService.getSingleTrackById(id);
  }

  @Post()
  async createNewTrack(@Body() dto: CreateTrackDto): Promise<TrackDto> {
    return await this.trackService.createTrack(dto);
  }

  @Put(':id')
  async updateTrackInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateTrackDto,
  ): Promise<TrackDto> {
    return await this.trackService.updateTrackInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.trackService.deleteTrack(id);
  }
}
