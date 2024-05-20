import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './school/school.module';
import { FileModule } from './file/file.module';
import { VerificationTokenModule } from './verification-token/verification-token.module';
import { MailModule } from './mail/mail.module';
import { ClassModule } from './class/class.module';
import { InviteModule } from './invite/invite.module';
import { QuizModule } from './quiz/quiz.module';
import { PostModule } from './post/post.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import mail from './config/mail';
import app_config from './config/appconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [mail, app_config] }),
    UserModule,
    AuthModule,
    SchoolModule,
    FileModule,
    VerificationTokenModule,
    MailModule,
    ClassModule,
    InviteModule,
    QuizModule,
    PostModule,
    StudentModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
