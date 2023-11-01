import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { FoodsService } from './foods.service';
import { Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { Inject, UseGuards } from '@nestjs/common';
import { GraphQLJwtAuthGuard } from 'src/auth/guards/graphql-jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { PubSub } from 'graphql-subscriptions';
import { FoodChangeResponse } from './dto/food-change.response';

@Resolver(() => Food)
export class FoodsResolver {
  constructor(
    private readonly foodsService: FoodsService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @UseGuards(GraphQLJwtAuthGuard)
  @Query(() => [Food])
  async findUnreviewedFoods(@CurrentUser() currentUser: { id: string }) {
    return await this.foodsService.findFoodsNotReviewedByUser(currentUser.id);
  }

  @UseGuards(GraphQLJwtAuthGuard)
  @Query(() => [Food])
  async findReviewedFoods(@CurrentUser() currentUser: { id: string }) {
    return await this.foodsService.findFoodsReviewedByUser(currentUser.id);
  }

  @UseGuards(GraphQLJwtAuthGuard)
  @Mutation(() => Food)
  async createFood(@Args('createFoodInput') createFoodInput: CreateFoodInput) {
    const foodAdded = await this.foodsService.create(createFoodInput);

    await this.pubSub.publish('foodAdded', {
      foodsChanged: {
        action: 'added',
        food: foodAdded,
      },
    });

    return foodAdded;
  }

  @UseGuards(GraphQLJwtAuthGuard)
  @Mutation(() => Food)
  async removeFood(@Args('id', { type: () => String }) id: string) {
    const foodRemoved = await this.foodsService.remove(id);

    await this.pubSub.publish('foodRemoved', {
      foodsChanged: {
        action: 'removed',
        food: foodRemoved,
      },
    });

    return foodRemoved;
  }

  @UseGuards(GraphQLJwtAuthGuard)
  @Subscription(() => FoodChangeResponse)
  async foodsChanged() {
    return this.pubSub.asyncIterator(['foodAdded', 'foodRemoved']);
  }
}
