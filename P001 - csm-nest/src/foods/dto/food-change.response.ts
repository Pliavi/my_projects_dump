import { Field, ObjectType } from '@nestjs/graphql';
import { Food } from '../entities/food.entity';

@ObjectType()
export class FoodChangeResponse {
  @Field()
  action: 'added' | 'removed';

  @Field(() => Food)
  food: Food;
}
