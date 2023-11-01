import { Query, Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLLocalAuthGuard } from './guards/graphql-local.guard';
import { AuthService } from './auth.service';
import { LoginUserResponse } from './dto/login-user.response';
import { LoginUserInput } from './dto/login-user.input';
import { GraphQLJwtAuthGuard } from './guards/graphql-jwt.guard';
import { CurrentUser } from './decorators/current-user';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginUserResponse)
  @UseGuards(GraphQLLocalAuthGuard)
  async login(
    @Args('loginUserInput') _loginUserInput: LoginUserInput,
    @Context() context: any,
  ): Promise<LoginUserResponse> {
    const loggedUser = await this.authService.login(context.user);

    return loggedUser;
  }

  @Query(() => String)
  @UseGuards(GraphQLJwtAuthGuard)
  async test(
    @Context() context: any,
    @CurrentUser() user: User,
  ): Promise<string> {
    console.log(user);

    return 'test';
  }
}
