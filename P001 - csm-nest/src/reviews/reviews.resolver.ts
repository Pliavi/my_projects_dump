import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { Food } from 'src/foods/entities/food.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { FoodsService } from 'src/foods/foods.service';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly foodsService: FoodsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Review)
  async createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    return await this.reviewsService.create(createReviewInput);
  }

  @Query(() => [Review], { name: 'reviewsFrom' })
  async findAllFromFood(@Args('foodId') foodId: string) {
    return await this.reviewsService.findAllFromFood(foodId);
  }

  @Mutation(() => Review)
  async removeReview(@Args('id', { type: () => String }) id: string) {
    return await this.reviewsService.remove(id);
  }

  @ResolveField(() => Food)
  async food(@Parent() review: Review) {
    const foodId = review.foodId;
    return this.foodsService.findOne(foodId);
  }

  @ResolveField(() => User)
  async reviewer(@Parent() review: Review) {
    const reviewerId = review.reviewerId;
    return this.usersService.findOne(reviewerId);
  }
}
