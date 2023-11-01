import { ObjectType, Field } from '@nestjs/graphql';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Food {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 150 })
  name: string;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.food)
  reviews: Review[];
}
