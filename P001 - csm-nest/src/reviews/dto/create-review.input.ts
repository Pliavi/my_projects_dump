import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String, { description: 'food to be reviewed' })
  foodId: string;

  @Field(() => String, { description: 'reviewer of the food' })
  reviewerId: string;

  @Field(() => String, {
    description: 'description of the food done by the reviewer',
  })
  review: string;

  @Field(() => Int, { description: 'rating of the food, from 0 to 10' })
  rating: number;
}
