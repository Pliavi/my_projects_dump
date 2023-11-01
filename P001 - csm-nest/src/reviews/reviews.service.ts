import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async findAllFromFood(foodId: string) {
    return await this.reviewRepository.find({
      where: { foodId },
    });
  }

  async create(createReviewInput: CreateReviewInput) {
    return await this.reviewRepository.save(createReviewInput, {
      reload: true,
    });
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(id: string) {
    return await this.reviewRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.reviewRepository.delete(id);
  }
}
