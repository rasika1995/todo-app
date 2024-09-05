import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTodoDto } from './create-todo.dto';

@InputType()
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @Field(() => Boolean, { nullable: true })
  completed?: boolean;
}
