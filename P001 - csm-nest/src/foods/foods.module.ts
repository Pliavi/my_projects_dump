import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsResolver } from './foods.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';

@Module({
  imports: [ReviewsModule, TypeOrmModule.forFeature([Food]), PubSubModule],
  providers: [FoodsResolver, FoodsService],
  exports: [FoodsService],
})
export class FoodsModule {}
