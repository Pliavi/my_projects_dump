import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { Food } from 'src/foods/entities/food.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Review {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Food)
  @ManyToOne(() => Food)
  @JoinColumn({ name: 'foodId' })
  food: Food;

  @Column()
  foodId: string;

  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'reviewerId' })
  reviewer: User;

  @Column()
  reviewerId: string;

  @Field()
  @Column()
  review: string;

  @Field(() => Int)
  @Column()
  @Min(0)
  @Max(10)
  rating: number;
}
