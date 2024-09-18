import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schemas';
import { TodoResolver } from './todo.resolver';
import { TodoGateway } from './todo.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoResolver, TodoGateway],
  exports: [TodoService],
})
export class TodoModule {}
