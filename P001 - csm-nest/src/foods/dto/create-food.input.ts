import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodInput {
  @Field({ description: 'name of the food' })
  name: string;
}
