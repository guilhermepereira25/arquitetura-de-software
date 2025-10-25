# REST API - API de Filmes (TypeScript + Express)

Este projeto é uma API simples organizada em camadas (Controllers, Services, Repositories) escrita em TypeScript e executada com `tsx` durante o desenvolvimento.

Observação importante: os repositórios usam arrays em memória como "banco de dados". Esses dados ficam apenas enquanto o processo estiver rodando; ao reiniciar o servidor, eles serão perdidos.

## Requisitos
- Node.js 18+ (recomendado)
- npm

## Instalação
No diretório `api/rest` execute:

```bash
npm install
```

## Rodando em desenvolvimento
No diretório `api/rest`:

```bash
npm run dev
```

O comando `dev` usa `tsx watch index.ts` e iniciará o servidor em `http://localhost:3000`.

## Build e execução em produção (opcional)
Gerar os arquivos compilados:

```bash
npm run build
```

Iniciar o build compilado (depois de `build`):

```bash
npm start
```

## Endpoints disponíveis
Base: `http://localhost:3000`

Filmes
- GET /filmes
  - Lista todos os filmes.
- GET /filmes/:id
  - Retorna um filme por ID.
- POST /filmes
  - Cria um filme.
  - Corpo (JSON): { "titulo": string, "anoLancamento": number, "generoId": number }
- PUT /filmes/:id
  - Atualiza campos de um filme.
  - Corpo (JSON) com os campos a alterar (ex.: { "titulo": "Novo" }).
- DELETE /filmes/:id
  - Remove um filme.
- GET /filmes/:id/atores
  - Lista atores associados ao filme.
- POST /filmes/:filmeId/atores
  - Associa um ator a um filme.
  - Corpo (JSON): { "atorId": number }

Atores
- GET /atores
  - Lista todos os atores.
- GET /atores/:id
  - Retorna um ator por ID.
- POST /atores
  - Cria um ator.
  - Corpo (JSON): { "nome": string, "dataNascimento": string }
- PUT /atores/:id
  - Atualiza campos do ator.
- DELETE /atores/:id
  - Remove um ator.

Gêneros (se implementado)
- GET /generos
- GET /generos/:id
- POST /generos
- PUT /generos/:id
- DELETE /generos/:id

## Exemplos rápidos com curl
Listar filmes:

```bash
curl -X GET http://localhost:3000/filmes
```

Criar filme:

```bash
curl -X POST http://localhost:3000/filmes -H "Content-Type: application/json" -d '{"titulo":"Inception","anoLancamento":2010,"generoId":1}'
```

Criar ator:

```bash
curl -X POST http://localhost:3000/atores -H "Content-Type: application/json" -d '{"nome":"Leonardo DiCaprio","dataNascimento":"1974-11-11"}'
```

Adicionar ator ao filme (supondo `filmeId=1` e `atorId=1`):

```bash
curl -X POST http://localhost:3000/filmes/1/atores -H "Content-Type: application/json" -d '{"atorId":1}'
```