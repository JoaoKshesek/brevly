# 🌐 Brev.ly Web

Aplicação web para gerenciamento de URLs encurtadas, desenvolvida com React, TypeScript e Vite, consumindo a API Brev.ly.

A aplicação permite criar, listar, deletar links encurtados, realizar redirecionamentos automáticos e exportar relatórios em CSV.

## 🚀 Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- TanStack Query (React Query)
- React Hook Form
- Zod

## 📌 Funcionalidades e Regras

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com encurtamento mal formatado
  - [x] Não deve ser possível criar um link com encurtamento já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível listar todas as URL’s cadastradas
- [x] Deve ser possível obter a URL original por meio do encurtamento
- [x] Deve ser possível listar todas as URL’s cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível baixar um CSV com o relatório dos links criados


## 🎯 Regras de Interface

- [x] Aplicação desenvolvida em React no formato SPA utilizando o Vite como ```bundler```;
- [x] Interface baseada no layout disponibilizado no Figma;
- [x] Feedback visual para o usuário:
  - [x] loading states
  - [x] empty states
  - [x] bloqueio de ações durante requisições
- [x] Interface responsiva para:
  - [x] Desktop
  - [x] Tablets
  - [x] Dispositivos móveis

## 📄 Páginas da Aplicação
### 🏠 Home (/)
- Formulário para criação de links
- Listagem de URLs cadastradas
- Exclusão de links
- Download do relatório CSV

### 🔁 Redirecionamento (/:slug)
- Busca a URL original na API
- Incrementa a contagem de acessos
- Redireciona automaticamente o usuário

### ❌ Not Found
Exibida quando:
- A rota não existe
- A URL encurtada não é encontrada

### 🌎 Variáveis de Ambiente

Crie um arquivo .env baseado no .env.example:
```
VITE_FRONTEND_URL=
VITE_BACKEND_URL=
```