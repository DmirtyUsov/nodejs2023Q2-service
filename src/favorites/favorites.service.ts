import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponseDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaQueryError } from 'src/prisma/errorcodes';

@Injectable()
export class FavoritesService {
  private MSG_NOTFOUND = 'ID does not exist in';

  constructor(private prisma: PrismaService) {}

  async getFavs(userId: string): Promise<FavoritesResponseDto> {
    const result: FavoritesResponseDto = {
      albums: [],
      artists: [],
      tracks: [],
    };

    const answer = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        FavsArtists: { select: { artist: true } },
        FavsAlbums: { select: { album: true } },
        FavsTracks: { select: { track: true } },
      },
    });

    result.artists = answer.FavsArtists.map((item) => item.artist);
    result.albums = answer.FavsAlbums.map((item) => item.album);
    result.tracks = answer.FavsTracks.map((item) => item.track);
    return result;
  }

  async addArtist(artistId: string, userId: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) {
      throw new UnprocessableEntityException(`${this.MSG_NOTFOUND} Artists`);
    }
    await this.prisma.favsArtists.create({ data: { userId, artistId } });
  }

  async deleteArtist(artistId: string, userId: string): Promise<void> {
    try {
      await this.prisma.favsArtists.delete({
        where: { userId_artistId: { userId, artistId } },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == PrismaQueryError.RecordsNotFound) {
          throw new NotFoundException(`Artist ${this.MSG_NOTFOUND} Favorites`);
        }
      }
      throw error;
    }
  }

  async addAlbum(albumId: string, userId: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      throw new UnprocessableEntityException(`${this.MSG_NOTFOUND} Albums`);
    }
    await this.prisma.favsAlbums.create({ data: { userId, albumId } });
  }

  async deleteAlbum(albumId: string, userId: string): Promise<void> {
    try {
      await this.prisma.favsAlbums.delete({
        where: { userId_albumId: { userId, albumId } },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == PrismaQueryError.RecordsNotFound) {
          throw new NotFoundException(`Album ${this.MSG_NOTFOUND} Favorites`);
        }
      }
      throw error;
    }
  }

  async addTrack(trackId: string, userId: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      throw new UnprocessableEntityException(`${this.MSG_NOTFOUND} Tracks`);
    }
    await this.prisma.favsTracks.create({ data: { userId, trackId } });
  }

  async deleteTrack(trackId: string, userId: string): Promise<void> {
    try {
      await this.prisma.favsTracks.delete({
        where: { userId_trackId: { userId, trackId } },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == PrismaQueryError.RecordsNotFound) {
          throw new NotFoundException(`Track ${this.MSG_NOTFOUND} Favorites`);
        }
      }
      throw error;
    }
  }
}
