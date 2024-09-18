<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a sample Todo application built using [NestJS](https://github.com/nestjs), MongoDB, REST API, GraphQL, and WebSockets. It demonstrates basic CRUD operations for managing a list of todos with REST, GraphQL endpoints, and real-time updates via WebSockets.

## Features

- **Create**: Add new todos
- **Read**: Retrieve all todos or a specific todo by ID
- **Update**: Modify existing todos
- **Delete**: Remove todos by ID
- **Scheduled Tasks**: Automatically clean up completed todos daily using a cron job
- **Authentication**: Protect routes with JWT-based AuthGuard

## Authentication

The application includes an `AuthGuard` that uses JWTs to protect routes. It is configured to:

- Verify JWT tokens with the HS256 algorithm.
- Attach the decoded token payload to the request if valid.
- Deny access if the token is invalid or missing.

Ensure the JWT secret is set in your `.env` file:

```env
JWT_SECRET=your-256-bit-secret
```

**Note**: API authorization is not yet implemented for WebSocket APIs. Authorization for REST and GraphQL APIs is in place.

## Installation

Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed. Then, follow these steps:

1. Clone the repository:

   ```bash
   $ git clone https://github.com/rasika1995/todo-app.git

   $ cd todo-app
   ```

2. Install the dependencies:

   ```bash
   $ yarn install
   ```

3. Configure MongoDB and JWT:

   Update your `.env` file with your MongoDB connection string and JWT secret:

   ```env
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your-256-bit-secret
   ```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## REST API Endpoints

All API requests require the Authorization header with a Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

#### Create Todo

- **Method**: `POST`
- **Endpoint**: `/todo`
- **Request Body**:
  ```json
  {
    "title": "Todo Title",
    "description": "Todo Description",
    "completed": false
  }
  ```
- **Description**: Adds a new todo to the list.

#### Get All Todos

- **Method**: `GET`
- **Endpoint**: `/todo`
- **Description**: Retrieves all todos.

#### Get Todo by ID

- **Method**: `GET`
- **Endpoint**: `/todo/:id`
- **Description**: Retrieves a specific todo by ID.

#### Update Todo

- **Method**: `PATCH`
- **Endpoint**: `/todo/:id`
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "completed": true
  }
  ```
- **Description**: Updates an existing todo by ID.

#### Delete Todo

- **Method**: `DELETE`
- **Endpoint**: `/todo/:id`
- **Description**: Deletes a specific todo by ID.

## GraphQL API Endpoint

The application also exposes a GraphQL API that allows you to perform CRUD operations on todos.

Endpoint: `/graphql`

#### HTTP HEADEARS

Include the Authorization header in your GraphQL requests to authenticate:

```json
{
  "Authorization": "Bearer <your-jwt-token>"
}
```

Replace `<your-jwt-token>` with your actual JWT token.

### Example Queries and Mutations

#### Create Todo

- **Mutation**:
  ```graphql
  mutation createTodo($todoItem: CreateTodoDto!) {
    createTodo(createTodoDto: $todoItem) {
      id
      title
      description
      completed
    }
  }
  ```
- **Query Variables:**
  ```json
  {
    "todoItem": {
      "title": "New todo",
      "description": "The sample description for new todo item"
    }
  }
  ```

#### Get All Todos

- **Query:**

  ```graphql
  query getTodoList {
    getAllTodos {
      id
      title
    }
  }
  ```

#### Get Todo by ID

- **Query:**

  ```graphql
  query getToDo($id: String!) {
    getTodo(id: $id) {
      id
      description
      title
      completed
    }
  }
  ```

- **Query Variables:**

  ```json
  {
    "id": <id>
  }
  ```

  Replace `<id>` with your actual id.

#### Update Todo

- **Mutation**:
  ```graphql
  mutation updateToDo($id: String!, $todoItem: UpdateTodoDto!) {
    updateTodo(id: $id, updateTodoDto: $todoItem) {
      id
      description
      title
      completed
    }
  }
  ```
- **Query Variables:**
  ```json
  {
    "id": <id>,
    "todoItem": {
      "title": "Updated title",
      "completed": true
    }
  }
  ```

#### Delete Todo

- **Mutation:**

  ```graphql
  mutation deleteToDo($id: String!) {
    deleteTodo(id: $id)
  }
  ```

- **Query Variables:**

  ```json
  {
    "id": <id>
  }
  ```

## WebSocket API

The application uses WebSockets to provide real-time updates for changes in the todo list. WebSocket connections are available at the following endpoint:

- **Endpoint**: `ws://localhost:3001`
- **Description**: Subscribe to this endpoint to receive real-time updates when todos are created, updated, or deleted.

**Note**: API authorization is not yet implemented for WebSocket APIs. Authorization for REST and GraphQL APIs is in place.

### Using Postman with Socket.IO

You can use Postman to test WebSocket connections. Here are the steps to subscribe to WebSocket endpoints and listen for events:

1. **Open Postman** and create a new Socket.IO request.
2. **Enter the WebSocket endpoint** (`ws://localhost:3001`) in the request URL field.
3. **Click the "Connect" button** to establish a WebSocket connection.

### Subscribing to Events

After connecting, you need to subscribe to various events and send messages to interact with the API. Follow these steps:

1. **Go to the "Events" Tab**:

   - Click on the "Events" tab in the WebSocket request pane.

2. **Add Events to Listen**:

   - In the "Events" tab, add the following events to listen for updates:
     - `createTodo`
     - `getAllTodos`
     - `getTodoById`
     - `updateTodo`
     - `deleteTodo`

3. **Send Messages**:
   - Switch to the "Messages" tab to send messages to the WebSocket server.

#### Create Todo

- **Event Name**: `createTodo`
- **Message**:
  ```json
  {
    "title": "<title>",
    "description": "<description>"
  }
  ```
- Send this message with the event name createTodo to create a new todo.

#### Get All Todos

- **Event Name**: getAllTodos
- **Message**:
  ```json
  {}
  ```
- **Description**: Send this message with the event name getAllTodos to retrieve all todos.

#### Get Todo by ID

- **Event Name**: getTodoById
- **Message**:
  ```json
  {
    "id": "<id>"
  }
  ```
- **Description**: Send this message with the event name getTodoById to retrieve a specific todo by ID.

#### Update Todo

- **Event Name**: updateTodo
- **Message**:
  ```json
  {
    "id": "<id>",
    "updateTodoDto" : {
      "title": "<updated title>",
      "description": "<updated description>",
      "completed": <true/false>
    }
  }
  ```
- **Description**: Send this message with the event name updateTodo to update an existing todo.

#### Delete Todo

- Event Name: deleteTodo
- Message:
  ```json
  {
    "id": "<id>"
  }
  ```
- Description: Send this message with the event name deleteTodo to delete a specific todo.

## Scheduled Tasks

This application includes a scheduled task that runs daily at midnight to clean up completed todos. The cron job is implemented using the NestJS `@nestjs/schedule` module. It triggers the `handleCron()` method in the `TasksService` class, which deletes all completed todos from the database and logs the results.

To test the cron job, you can modify the schedule to run every 30 seconds:

```typescript
@Cron(CronExpression.EVERY_30_SECONDS)
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
