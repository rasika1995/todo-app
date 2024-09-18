import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@WebSocketGateway(3001, {
  cors: true,
  transports: ['websocket'],
}) // Change to a different port to avoid conflict with REST API
export class TodoGateway {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
    server.on('connection', (socket) => {
      console.log('New connection from client:', socket.id);
    });
  }

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  constructor(private readonly todoService: TodoService) {}

  @SubscribeMessage('createTodo')
  async handleCreateTodo(@MessageBody() createTodoDto: CreateTodoDto) {
    const newTodo = await this.todoService.create(createTodoDto);
    this.server.emit('createTodo', newTodo);
  }

  @SubscribeMessage('getAllTodos')
  async handleGetAllTodos() {
    const todos = await this.todoService.findAll();
    this.server.emit('getAllTodos', todos);
  }

  @SubscribeMessage('getTodoById')
  async handleGetTodoById(@MessageBody() body: { id: string }) {
    const { id } = body;
    const todo = await this.todoService.findOne(id);
    this.server.emit('getTodoById', todo);
  }

  @SubscribeMessage('updateTodo')
  async handleUpdateTodo(
    @MessageBody() body: { id: string; updateTodoDto: UpdateTodoDto },
  ) {
    const { id, updateTodoDto } = body;
    const updatedTodo = await this.todoService.update(id, updateTodoDto);
    this.server.emit('updateTodo', updatedTodo);
  }

  @SubscribeMessage('deleteTodo')
  async handleDeleteTodo(@MessageBody() body: { id: string }) {
    const { id } = body;
    await this.todoService.remove(id);
    this.server.emit('deleteTodo', id);
  }
}
