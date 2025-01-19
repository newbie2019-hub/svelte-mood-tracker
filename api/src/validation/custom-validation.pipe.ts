import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (validationErrors: ValidationError[]) => {
        // Format validation errors
        const errors = validationErrors.reduce(
          (acc, error) => {
            const fieldErrors = Object.values(error.constraints || {}).join(
              ', ',
            );
            acc[error.property] = fieldErrors;
            return acc;
          },
          {} as Record<string, string>,
        );

        return new BadRequestException({
          error: 'Invalid form request',
          statusCode: 400,
          message: errors,
        });
      },
    });
  }
}
