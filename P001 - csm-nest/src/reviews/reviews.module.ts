import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { UsersService } from 'src/users/users.service';
import { FoodsService } from 'src/foods/foods.service';
import { User } from 'src/users/entities/user.entity';
import { Food } from 'src/foods/entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Food])],
  providers: [ReviewsResolver, ReviewsService, UsersService, FoodsService],
  exports: [TypeOrmModule.forFeature([Review])],
})
export class ReviewsModule {}
