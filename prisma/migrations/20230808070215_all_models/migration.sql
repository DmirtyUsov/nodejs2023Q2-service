-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavsArtists" (
    "artistId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavsArtists_pkey" PRIMARY KEY ("userId","artistId")
);

-- CreateTable
CREATE TABLE "FavsAlbums" (
    "albumId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavsAlbums_pkey" PRIMARY KEY ("userId","albumId")
);

-- CreateTable
CREATE TABLE "FavsTracks" (
    "trackId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavsTracks_pkey" PRIMARY KEY ("userId","trackId")
);

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsArtists" ADD CONSTRAINT "FavsArtists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsArtists" ADD CONSTRAINT "FavsArtists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsAlbums" ADD CONSTRAINT "FavsAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsAlbums" ADD CONSTRAINT "FavsAlbums_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsTracks" ADD CONSTRAINT "FavsTracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsTracks" ADD CONSTRAINT "FavsTracks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
