import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GraphQLLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext();
    const input = gqlContext.getArgs().loginUserInput;

    request.body ??= {};
    request.body['email'] = input.email;
    request.body['password'] = input.password;

    return request;
  }
}
