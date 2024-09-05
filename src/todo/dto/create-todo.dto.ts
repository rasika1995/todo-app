import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreateTodoDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
