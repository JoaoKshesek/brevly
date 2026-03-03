# 🌐 Brev.ly

Encurtador de URLs completo com frontend em React e API em Fastify, permitindo criar, listar, deletar e redirecionar links encurtados, além de exportar relatórios em CSV via CDN.

## 🏗️ Estrutura do Projeto

```
brevly/
 ├── web/      # Aplicação React (Vite)
 └── server/   # API Fastify + PostgreSQL
```

- Web → Interface para gerenciamento dos links
- API → Regras de negócio, persistência e exportação CSV

## 🚀 Principais Funcionalidades

- [x] Criar links encurtados
- [x] Validação de slug único e formato correto
- [x] Listar URLs cadastradas
- [x] Deletar links
- [x] Redirecionamento automático via /:slug
- [x] Contabilização de acessos
- [x] Exportação de relatório em CSV
- [x] Upload do CSV para CDN (Cloudflare R2)

## 🛠️ Tecnologias

### Frontend

- React
- TypeScript
- Vite
- TanStack Query
- React Hook Form + Zod

### Backend

- TypeScript
- Fastify
- Drizzle ORM
- PostgreSQL
- Cloudflare R2
- Docker

## 🌎 Variáveis de Ambiente

Cada projeto possui seu próprio .env.example com as variáveis necessárias.

```
web/.env
server/.env
```

## 📄 Documentação Completa

Para detalhes específicos:

- 📘 Veja web/README.md
- 📙 Veja server/README.md
