import { Response, Request } from 'express';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { AuthRequestHelper } from '../utils/cookie-helper.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type JwtPayload = { sub?: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieHelper: AuthRequestHelper,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    if (!payload || !payload.sub) return null;

    const user = await this.userService.findUserById(payload.sub);
    if (user && !user.isActive) {
      return;
    }

    if (user) await this.prolongTokenLifeIfNeeded(user.id, req);

    return user;
  }

  private async prolongTokenLifeIfNeeded(userId: string, req: Request) {
    const res = req.res as Response;

    if (!res) {
      throw new Error('Response is not defined');
    }

    const token = this.cookieHelper.getJwtTokenFromCookie(req);

    const isCloseToExpire = this.authService.jwtCloseToExpire(token);

    if (!isCloseToExpire) return;

    const newToken = await this.authService.signJwtToken(userId);

    this.cookieHelper.attachJwtTokenToCookie(res, newToken);
  }
}

const cookieExtractor = (req: Request) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies[AuthRequestHelper.JWT_COOKIE_NAME];
  }

  return token;
};
