import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './models/todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

// GRAPHQL
@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'getAllTodos' })
  findAll() {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'getTodo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('createTodoDto') createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('id') id: string,
    @Args('updateTodoDto') updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Args('id') id: string): Promise<boolean> {
    try {
      await this.todoService.remove(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
