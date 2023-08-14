import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto, CreateAlbumDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaQueryError } from 'src/prisma/errorcodes';

@Injectable()
export class AlbumService {
  private MSG_NOTFOUND = 'Album does not exist';
  constructor(private prisma: PrismaService) {}

  async getAllAlbums(): Promise<AlbumDto[]> {
    return await this.prisma.album.findMany();
  }

  async getSingleAlbumById(id: string): Promise<AlbumDto> {
    const result = await this.prisma.album.findUnique({
      where: { id: id },
    });
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    return result;
  }

  async createAlbum(dto: CreateAlbumDto): Promise<AlbumDto> {
    const artistId = dto.artistId ? dto.artistId : undefined;

    return await this.prisma.album.create({
      data: {
        name: dto.name,
        year: dto.year,
        artist: artistId && { connect: { id: artistId } },
      },
    });
  }

  async updateAlbumInfo(id: string, dto: CreateAlbumDto): Promise<AlbumDto> {
    const artistId = dto.artistId ? dto.artistId : undefined;

    try {
      const result = await this.prisma.album.update({
        where: { id: id },
        data: {
          name: dto.name,
          year: dto.year,
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

  async deleteAlbum(id: string): Promise<AlbumDto> {
    try {
      const result = await this.prisma.album.delete({
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
