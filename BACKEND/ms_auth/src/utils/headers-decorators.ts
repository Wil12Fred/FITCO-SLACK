import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export const AccountHeader = () => {
  return applyDecorators(
    ApiHeader({
      name: 'account',
      description: 'account ID',
    }),
  );
};
