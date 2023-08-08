import { Injectable, NotFoundException } from '@nestjs/common';
import { MydbService } from 'src/mydb/mydb.service';
import { CreateTrackDto, TrackDto } from './dto';
import * as uuid from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaQueryError } from 'src/prisma/errorcodes';

@Injectable()
export class TrackService {
  private MSG_NOTFOUND = 'Track does not exist';
  constructor(private prisma: PrismaService, private mydb: MydbService) {}

  async getAllTracks(): Promise<TrackDto[]> {
    return await this.prisma.track.findMany();
  }

  async getSingleTrackById(id: string): Promise<TrackDto> {
    const result = await this.prisma.track.findUnique({
      where: { id: id },
    });
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    return result;
  }

  async createTrack(dto: CreateTrackDto): Promise<TrackDto> {
    const artistId = dto.artistId ? dto.artistId : undefined;
    const albumId = dto.albumId ? dto.albumId : undefined;
    return await this.prisma.track.create({
      data: {
        name: dto.name,
        duration: dto.duration,
        album: albumId && { connect: { id: albumId } },
        artist: artistId && { connect: { id: artistId } },
      },
    });
  }

  async updateTrackInfo(id: string, dto: CreateTrackDto): Promise<TrackDto> {
    const artistId = dto.artistId ? dto.artistId : undefined;
    const albumId = dto.albumId ? dto.albumId : undefined;
    try {
      const result = await this.prisma.track.update({
        where: { id: id },
        data: {
          name: dto.name,
          duration: dto.duration,
          album: albumId && { connect: { id: albumId } },
          artist: artistId && { connect: { id: artistId } },
        },
      });
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == PrismaQueryError.RecordsNotFound) {
          throw new NotFoundException(this.MSG_NOTFOUND);
        }
      }
      throw error;
    }
  }

  async deleteTrack(id: string): Promise<TrackDto> {
    try {
      const result = await this.prisma.track.delete({
        where: { id: id },
      });
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == PrismaQueryError.RecordsNotFound) {
          throw new NotFoundException(this.MSG_NOTFOUND);
        }
      }
      throw error;
    }
  }
}
