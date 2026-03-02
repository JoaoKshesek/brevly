# 🔗 Brev.ly API

API para gerenciamento de encurtamento de URLs, desenvolvida com TypeScript, Fastify, Drizzle ORM e PostgreSQL.

O projeto permite criar, listar, deletar, redirecionar links encurtados, contabilizar acessos e exportar os dados em CSV com upload para CDN (Cloudflare R2).

## 🚀 Tecnologias Utilizadas

- TypeScript
- Fastify
- Drizzle ORM
- PostgreSQL
- Cloudflare R2 (S3 compatible)
- Docker

## 📌 Funcionalidades e Regras

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com URL encurtada mal formatada
  - [x] Não deve ser possível criar um link com URL encurtada já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada
- [x] Deve ser possível listar todas as URL’s cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível exportar os links criados em um CSV
  - [x] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
  - [x] Deve ser gerado um nome aleatório e único para o arquivo
  - [x] Deve ser possível realizar a listagem de forma performática
  - [x] O CSV deve conter os campos:
    - [x] URL original
    - [x] URL encurtada
    - [x] Contagem de acessos
    - [x] Data de criação

## 🧱 Arquitetura

O projeto segue uma arquitetura organizada por camadas:

```
src/
 ├── server.ts
 ├── routes/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── db/
 │   ├── schema.ts
 │   └── migrations/
 └── utils/
```

- Routes → Definição dos endpoints
- Controllers → Orquestração da requisição
- Services → Regras de negócio
- Repositories → Comunicação com banco (Drizzle)
- DB → Configuração do banco e migrations

## 🌎 Variáveis de Ambiente

Crie um arquivo .env baseado no .env.example abaixo:

```
PORT=
DATABASE_URL=

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

## 🛠️ Scripts Disponíveis

```
# desenvolvimento
npm run dev

# build
npm run build

# start produção
npm run start

# rodar migrations
npm run db:migrate
```

> ⚠️ O script db:migrate executa as migrations do banco via Drizzle.

## 🗄️ Banco de Dados

Banco utilizado: PostgreSQL

Exemplo de tabela ```links```

| Campo       | Tipo        | Descrição             |
| ----------- | ----------- | --------------------- |
| id          | uuid        | Identificador único   |
| originalUrl | text        | URL original          |
| shortUrl    | varchar     | URL encurtada única   |
| accessCount | integer     | Quantidade de acessos |
| createdAt   | timestamp   | Data de criação       |

## 🔐 Validações Importantes
 - URL encurtada deve seguir padrão alfanumérico.
 - URL encurtada deve ser única.
 - Índice único no banco para shortUrl.
 - CORS habilitado.

## ☁️ Exportação CSV
 - Geração dinâmica do CSV
 - Nome único gerado via UUID
 - Upload para Cloudflare R2
 - Retorno de URL pública via CLOUDFLARE_PUBLIC_URL
 - Arquivo contém:
    - id
    - original_url
    - short_url
    - access_count
    - created_at