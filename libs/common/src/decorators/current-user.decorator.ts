import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  } else {
    const user = context.getArgs()[2]?.req.headers?.user;
    if (user) {
      return JSON.parse(user);
    }
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
