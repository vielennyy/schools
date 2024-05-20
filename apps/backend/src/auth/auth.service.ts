import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/SignInDto';

export type JwtPayload = { sub?: string };
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async studentSignUp(createUserDto: CreateUserDto) {
    return this.userService.createStudent(createUserDto);
  }

  async directorSignUp(createUserDto: CreateUserDto) {
    return this.userService.createDirector(createUserDto);
  }

  async getUserById(userId: string) {
    return this.userService.findUserById(userId);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findOneByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password!,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('password');
    }
    return {
      user,
    };
  }

  async signJwtToken(id: string): Promise<string> {
    const payload: JwtPayload = { sub: id };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    return accessToken;
  }

  jwtCloseToExpire(token: string): boolean {
    const payload = this.jwtService.decode<JwtPayload & { exp: number }>(token);

    if (!payload || !payload.sub || !payload.exp) return false;

    const intervalLeft = payload.exp - Date.now() / 1000;

    if (intervalLeft < 0) return false;

    const isCloseToExpire =
      intervalLeft < Number(process.env.JWT_EXPIRATION_TRESHOLD_SECONDS);

    return isCloseToExpire;
  }
}
