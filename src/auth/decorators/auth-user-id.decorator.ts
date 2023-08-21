import { createParamDecorator } from '@nestjs/common';

export const AuthUserId = createParamDecorator((data, req) => {
  return req.switchToHttp().getRequest().user.sub;
});
