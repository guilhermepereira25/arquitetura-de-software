-- CreateTable
CREATE TABLE "Ator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "nacionalidade" TEXT
);

-- CreateTable
CREATE TABLE "Filme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "diretor" TEXT NOT NULL,
    "anoLancamento" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Genero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FilmeAtor" (
    "filmeId" INTEGER NOT NULL,
    "atorId" INTEGER NOT NULL,

    PRIMARY KEY ("filmeId", "atorId"),
    CONSTRAINT "FilmeAtor_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "Filme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmeAtor_atorId_fkey" FOREIGN KEY ("atorId") REFERENCES "Ator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmeGenero" (
    "filmeId" INTEGER NOT NULL,
    "generoId" INTEGER NOT NULL,

    PRIMARY KEY ("filmeId", "generoId"),
    CONSTRAINT "FilmeGenero_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "Filme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmeGenero_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
