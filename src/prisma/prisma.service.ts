import { Injectable } from '@nestjs/common';
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
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://hluser:123@hl-database:5432/hldb?schema=public',
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
