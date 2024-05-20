import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInDto } from './dto/SignInDto';
import { AuthRequestHelper } from './utils/cookie-helper.service';
import { JwtGuard } from './guards/jwt-auth.guard';
import { UserDec } from '../decorators/user.decorator';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { ResponseUserDto } from 'src/user/dto/response.dto';

@ApiTags('Auth Endpoints')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly requestHelper: AuthRequestHelper,
    private readonly mailService: MailService,
  ) {}

  @Get('get/me')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create logined user' })
  @ApiOkResponse({
    type: ResponseUserDto,
  })
  async getMe(@UserDec() user: any) {
    return this.authService.getUserById(user.id);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({
    type: CreateUserDto,
  })
  @ApiBody({ type: CreateUserDto })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.studentSignUp(createUserDto);
  }

  @Post('signup/director')
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({
    type: CreateUserDto,
  })
  @ApiBody({ type: CreateUserDto })
  async directorSignUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.directorSignUp(createUserDto);
    this.mailService.sendDirectorWasCreatedMail(user.id);
    return user;
  }

  @Post('signin')
  @ApiCookieAuth('jwt')
  @ApiOperation({ summary: 'Signin user' })
  @ApiBody({ type: SignInDto })
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: SignInDto,
  ) {
    const user = await this.authService.signIn(signInDto);
    if (user) {
      const token = await this.authService.signJwtToken(user.user.id);

      await this.requestHelper.attachJwtTokenToCookie(res, token);
      return user;
    }
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.requestHelper.clearJwtTokenFromCookie(res);
  }
}
