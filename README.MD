# Desafio Técnico Jitterbit - API de Pedidos

API RESTful desenvolvida em Node.js para gerenciamento de pedidos (Orders).

## Funcionalidades

- **Autenticação:** Proteção de rotas via JSON Web Token (JWT).
- **Transformação de Dados:** Recebe payloads.
- **Persistência:** Banco de dados relacional PostgreSQL.

## Autenticação (JWT)

Esta API é protegida. Para acessar as rotas de pedidos (`/order`), é obrigatório enviar o token de autenticação no Header da requisição.

### Header Obrigatório

`Authorization: Bearer <SEU_TOKEN_AQUI>`

### Como obter o token

Utilize a rota de geração de tokens passando um ID arbitrário na URL.

`GET /genToken/:id`

## Configuração e Instalação

### Pré-requisitos

- Node.js (v14+)
- PostgreSQL instalado

### Instalação

```bash
# Clone este repositório
git clone https://github.com/Arluzss/JitterBitAPI.git

# Entre na pasta
cd JitterBitAPI

# Instale as dependências
npm install
```

### Configuração do Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto e configure conforme o exemplo abaixo.
Atenção: As chaves de JWT são obrigatórias para o funcionamento da autenticação.

```env
# Configuração do Banco de Dados
DB_USER=postgres
DB_HOST=localhost
DB_NAME=jitterbit_db
DB_PASSWORD=sua_senha
DB_PORT=5432
PORT=3000

# Configuração do JWT (Segurança)
JWT_SECRET=ChaveHiperMegaSecreta
JWT_EXPIRES=1h
```

### Banco de Dados (SQL)

Crie um banco chamado `jitterbit_db` e execute o script SQL abaixo para criar as tabelas:

```sql
CREATE TABLE orders (
    orderId VARCHAR(50) PRIMARY KEY,
    value NUMERIC(10, 2) NOT NULL,
    creationDate TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    orderId VARCHAR(50) REFERENCES orders(orderId),
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);
```

### Execução

```bash
# Rodar em modo de desenvolvimento
npm run dev
```

## Endpoints da API

A documentação completa está na coleção do Postman inclusa no projeto (`Desafio Jitterbit API.postman_collection.json`). Abaixo, um resumo dos endpoints disponíveis.

### Geração de Token (Público)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/genToken/:id` | Gera um Token JWT baseado no ID fornecido na URL. |

#### Exemplo de uso

```bash
curl -X GET "http://localhost:3000/genToken/12345" -H "Content-Type: application/json"
```

Resposta (exemplo):

```json
{
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Pedidos (Requer Token Bearer)

| Método | Rota | Descrição |
|--------|------|-----------|
| POST   | `/order`      | Cria novo pedido. |
| GET    | `/order/:id`  | Busca pedido por ID. |
| GET    | `/order/list` | Lista todos os pedidos. |
| PUT    | `/order/:id`  | Atualiza um pedido existente. |
| DELETE | `/order/:id`  | Deleta pedido e itens associados. |

### Exemplo de Criação (POST /order)

Body

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```