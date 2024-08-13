import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly todoService: TodoService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Running daily cleanup of completed todos.');

    const deletedCount = await this.todoService.deleteCompletedTodos();
    this.logger.debug(`Deleted ${deletedCount} completed todos.`);
  }
}
