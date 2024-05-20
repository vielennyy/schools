import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateQuizQuestionDto } from './create-quiz-question.dto';

export class StudentQuizQuestionDto extends PartialType(
  OmitType(CreateQuizQuestionDto, ['answer'] as const),
) {}
