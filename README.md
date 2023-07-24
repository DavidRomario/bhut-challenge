# Desafio BHUT

## Inicializar o projeto
- Requisitos: docker-compose

- Renomeie o ``.env.example`` para ``.env``

- Para inicializar, rode o comando abaixo em seu terminal
  ````
  docker-compose up -d
  ````

## Rotas
- Método: GET
- URL de exemplo: http://localhost:3000/cars
- Response de exemplo:
 ````
{
    "success": true,
    "message": "",
    "payload": [
        {
            "_id": "643c759e94a4c4001c3e19d4",
            "title": "Prisma",
            "brand": "VW",
            "price": "70.000",
            "age": 2020,
            "__v": 0
        },
    ]
}
````

- Método: POST
- URL de exemplo: http://localhost:3000/cars/createCar
- Body de exemplo:
  ````
  {
  "title": "String",
  "brand": "String",
  "price": "String",
  "age": 0
  }

- Método: GET
- URL de exemplo: http://localhost:3000/cars/logs
- Response de exemplo:

````
{
    "success": true,
    "message": "",
    "payload": [
        {
            "_id": "64bdc77373e7f17671bfb917",
            "car_id": "64bdc77394a4c4001c3e1aae",
            "data_hora": "2023-07-24T00:36:03.373Z",
            "__v": 0
        }
   ]
}
````

## Verificação de fila

- Rode o comando
  ````
  docker ps
  ````
- Copie o ID do CONTAINER da API
- Rode o comando para entrar no container
  ````
  docker exec -ti ID DO CONTAINER bash
  ````
  - Após entrar no container execute o comando
    ````
    node libs/consumer.js
    ```` 

# Tecnologias utilizadas
- NodeJs
- Express.js
- Docker Compose
- Mongoose
- RabbitMQ

## Banco de dados

- MongoDB
