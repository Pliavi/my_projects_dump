import { Injectable } from '@nestjs/common';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';
import { Repository, Not, In } from 'typeorm';
import { Food } from './entities/food.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/review.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async findFoodsNotReviewedByUser(userId: string) {
    const reviewsFromUser = await this.reviewRepository.find({
      select: ['foodId'],
      where: { reviewerId: userId },
    });
    const reviewedfoodIds = reviewsFromUser.map((review) => review.foodId);

    const foods = await this.foodRepository.find({
      relations: ['reviews'],
      where: {
        id: Not(In(reviewedfoodIds)),
      },
    });

    return foods;
  }

  async findFoodsReviewedByUser(userId: string) {
    const foods = await this.foodRepository.find({
      relations: ['reviews'],
      where: {
        reviews: {
          reviewerId: userId,
        },
      },
    });

    return foods;
  }

  async create(createFoodInput: CreateFoodInput) {
    return await this.foodRepository.save(createFoodInput);
  }

  async findAll() {
    return await this.foodRepository.find();
  }

  async findOne(id: string) {
    return await this.foodRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateFoodInput: UpdateFoodInput) {
    return await this.foodRepository.update(id, updateFoodInput);
  }

  async remove(id: string) {
    const find = await this.foodRepository.findOne({ where: { id } });
    const deleted = await this.foodRepository.delete(id);
    console.log(deleted);

    return find;
  }
}
