import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { FoodsModule } from './foods/foods.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    PubSubModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/db.sqlite',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true, // remove on production
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          path: '/subscriptions',
        },
      },
      context: (context) => {
        if (context.connectionParams) {
          const authorization =
            context.connectionParams['headers']['Authorization'];

          context.req = {
            headers: {
              authorization: authorization,
            },
          };
        }

        return context;
      },
    }),
    UsersModule,
    FoodsModule,
    ReviewsModule,
  ],
})
export class AppModule {}
