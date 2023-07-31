import { FavoritesDto } from 'src/favorites/dto';

export class FavoritesDB {
  private db: FavoritesDto;

  constructor() {
    this.db = {
      artists: new Set<string>(),
      albums: new Set<string>(),
      tracks: new Set<string>(),
    };
  }

  add(table: string, id: string): void {
    this.db[table].add(id);
  }

  delete(table: string, id: string): boolean {
    return this.db[table].delete(id);
  }

  list(table: string): string[] {
    return Array.from(this.db[table].values());
  }
}
