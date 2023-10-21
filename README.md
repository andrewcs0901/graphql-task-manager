# GraphQL Task Manager

Projeto de gestão de tarefas utilizando NodeJS, Apollo GraphQL

## Instalação

```bash
npm install
```

## Execução

```bash
node index.js
```

## Endpoints

Este projeto possui dois endpoints, um para autenticação e outro para a API GraphQL.

### Login

O login é responsável por realizar a autenticação do usuário e retornar um token JWT para ser utilizado nas requisições da API GraphQL.

Passos:

1 - Realize uma requisição POST para o endpoint de login com o usuário e senha padrão:

```bash
curl --location 'http://localhost:4000/api/login' \
--header 'Content-Type: application/json' \
--data '{ "username": "admin", "password": "admin"}'
```

Exemplo de resposta:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjk3OTIwMTYxLCJleHAiOjE2OTc5MjA3NjF9.Q1TqWZwljQ1cV0-GfXivgWkEbvr0WdwpvVad08hIYUY"
}
```

2 - Copie o token retornado no corpo da requisição e adicione no header do [GraphQL Playground](http://localhost:4000/api/graphql) conforme a imagem abaixo:
![Alt text](assets/authorization-example.png)

### GraphQL

O endpoint [GraphQL Playground](http://localhost:4000/api/graphql) é responsável por realizar as operações de CRUD de tarefas e listagem de usuários .

⚠ Apenas a requisição de listagem de usuários não necessita de autenticação.

#### Exemplos de consultas

- Listar usuários
```graphql
query Query {
  users {
    id
    username
  }
}
```

- Listar todas as tarefas do usuário
```graphql
query Query {
  tasks {
    id
    owner
    isDone
    title
    description
  }
}
```

- Listar tarefas do usuário por status isDone (true ou false)
```graphql
query Query($isDone: Boolean) {
  tasks(isDone: $isDone) {
    id
    owner
    isDone
    title
    description
  }
}
```

- Listar tarefa do usuário por id
```graphql
query Query($taskId: ID!) {
  task(id: $taskId) {
    id
    owner
    isDone
    title
    description
  }
}
```

#### Exemplos de mutações

- Criar usuário
```graphql
mutation createUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    id
    username
  }
}
```

- Criar tarefa
```graphql
mutation Mutation($title: String!, $description: String) {
  createTask(title: $title, description: $description) {
    id
    owner
    isDone
    title
    description
  }
}
```

- Atualizar tarefa
```graphql
mutation Mutation($updateTaskId: ID!, $title: String, $description: String, $isDone: Boolean) {
  updateTask(id: $updateTaskId, title: $title, description: $description, isDone: $isDone) {
    id
    owner
    isDone
    title
    description
  }
}
```

- Deletar tarefa
```graphql
mutation DeleteTask($deleteTaskId: ID!) {
  deleteTask(id: $deleteTaskId) {
    id
    owner
    isDone
    title
    description
  }
}
```
