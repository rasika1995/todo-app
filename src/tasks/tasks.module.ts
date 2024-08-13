import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  imports: [TodoModule],
  providers: [TasksService],
})
export class TasksModule {}
