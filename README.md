# Pedidos API

API REST desenvolvida em Node.js utilizando NestJS para gerenciamento de pedidos.

## Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- TypeORM
- MySQL
- Class Validator

## Funcionalidades

A API permite:

- Criar um pedido
- Buscar um pedido pelo número
- Listar todos os pedidos
- Atualizar um pedido
- Deletar um pedido

## Estrutura do pedido recebido

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

## Transformação dos dados (mapping)

Antes de salvar no banco, os dados são transformados para o seguinte formato:

{
  "orderId": "v10089016vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}

## Endpoints

Criar pedido
POST /order

Buscar pedido por ID
GET /order/:orderId

Listar pedidos
GET /order/list

Atualizar pedido
PUT /order/:orderId

Deletar pedido
DELETE /order/:orderId

## Testes da API

Na pasta postman está disponível a collection do Postman para facilitar os testes da API.

## Como executar o projeto

Instale as dependências:

npm install

Execute o projeto:

npm run start:dev

A API ficará disponível em:

http://localhost:3000

---

Depois disso rode:

git add .
git commit -m "docs: adiciona README do projeto"
git push

## Resultado

Seu repositório terá:

pedidos-api
 ├ postman
 │  └ pedidos-api.postman_collection.json
 ├ src
 ├ README.md
 └ package.json
