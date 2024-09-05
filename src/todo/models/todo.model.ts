import { Field, ObjectType } from '@nestjs/graphql';

// GRAPHQL
@ObjectType()
export class Todo {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  completed: boolean;
}
