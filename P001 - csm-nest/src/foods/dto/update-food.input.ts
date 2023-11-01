import { CreateFoodInput } from './create-food.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field()
  id: string;

  @Field({ description: 'name of the food' })
  name: string;
}
