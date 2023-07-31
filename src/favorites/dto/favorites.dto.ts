export class FavoritesDto {
  artists: Set<string>; // favorite artists ids
  albums: Set<string>; // favorite albums ids
  tracks: Set<string>; // favorite tracks ids
}

export enum FavRecords {
  artists = 'artists',
  albums = 'albums',
  tracks = 'tracks',
}
