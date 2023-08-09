import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto, CreateArtistDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaQueryError } from 'src/prisma/errorcodes';

@Injectable()
export class ArtistService {
  private MSG_NOTFOUND = 'Artist does not exist';
  constructor(private prisma: PrismaService) {}

  async getAllArtists(): Promise<ArtistDto[]> {
    return await this.prisma.artist.findMany();
  }

  async getSingleArtistById(id: string): Promise<ArtistDto> {
    const result = await this.prisma.artist.findUnique({
      where: { id: id },
    });
    if (!result) {
      throw new NotFoundException(this.MSG_NOTFOUND);
    }
    return result;
  }

  async createArtist(dto: CreateArtistDto): Promise<ArtistDto> {
    return await this.prisma.artist.create({
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
  }

  async updateArtistInfo(id: string, dto: CreateArtistDto): Promise<ArtistDto> {
    try {
      const result = await this.prisma.artist.update({
        where: { id: id },
        data: {
          name: dto.name,
          grammy: dto.grammy,
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

  async deleteArtist(id: string): Promise<ArtistDto> {
    try {
      const result = await this.prisma.artist.delete({
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
