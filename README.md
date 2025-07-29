````markdown
# Projeto Vue + Backend

Este projeto é uma aplicação Vue 3 com um backend simples para receber dados via API. 

---

## Estrutura do projeto

- `/client` - aplicação frontend Vue 3  
- `/server` - backend simples (Node.js/Express) que serve API e arquivos estáticos

---

## Pré-requisitos

- Node.js (versão 16+ recomendada)  
- npm instalado

---

## Como rodar a aplicação localmente

### 1. Rodar o backend (server)

```bash
cd server
npm install
npm run dev
````

O backend estará disponível em [http://localhost:3000](http://localhost:3000)

---

### 2. Rodar o frontend (client)

```bash
cd client
npm install
npm run dev
```

O frontend estará disponível em [http://localhost:5173](http://localhost:5173)

---

### 3. Build do frontend e deploy no backend (opcional)

Para gerar os arquivos estáticos do frontend e servir via backend:

```bash
cd client
npm run build
```

O client vai buildar e salvas na pasta `server/public` (ou onde o backend serve os arquivos estáticos).

---

## Executando testes

Os testes são configurados com Vitest + Vue Test Utils.

### Rodar todos os testes

```bash
npm run test
```

### Rodar testes com cobertura

```bash
npm run test -- --coverage
```

Os relatórios de cobertura ficarão disponíveis na pasta `coverage`.

---

## Observações

* O backend possui CORS habilitado para permitir comunicação com o frontend durante o desenvolvimento.
* As chamadas API do frontend são configuradas para `http://localhost:3000/registration`.
* Os arquivos estáticos são configurados para `http://localhost:3000/`.

---
