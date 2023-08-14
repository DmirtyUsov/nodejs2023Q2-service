import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

// extension to transform fields type in results returned by Prisma queries
const createPrismaExtended = (prisma: PrismaClient) =>
  prisma.$extends({
    result: {
      user: {
        // DateTime to number
        createdAt: {
          needs: { createdAt: true },
          compute(user) {
            return user.createdAt.getTime();
          },
        },
        // DateTime to number
        updatedAt: {
          needs: { updatedAt: true },
          compute(user) {
            return user.updatedAt.getTime();
          },
        },
      },
    },
  });

@Injectable()
export class PrismaService extends PrismaClient {
  private _prisma: ReturnType<typeof createPrismaExtended>;
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  // Create an Extended instance when needed
  get extended() {
    if (!this._prisma) {
      this._prisma = createPrismaExtended(this);
    }

    return this._prisma;
  }
}
