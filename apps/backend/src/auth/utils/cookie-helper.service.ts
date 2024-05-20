import { Request, Response } from 'express';

export class AuthRequestHelper {
  constructor() {}

  static readonly JWT_COOKIE_NAME = 'jwt';

  attachJwtTokenToCookie(res: Response, token: string) {
    res.cookie(AuthRequestHelper.JWT_COOKIE_NAME, token, { httpOnly: true });
  }

  clearJwtTokenFromCookie(res: Response) {
    res.clearCookie(AuthRequestHelper.JWT_COOKIE_NAME);
  }

  getJwtTokenFromCookie(req: Request): string {
    return req.cookies[AuthRequestHelper.JWT_COOKIE_NAME];
  }
}
