import * as Joi from 'joi';
import config from './config';
import { enviroments } from './environments';

export const typeOrmConfig = {
  envFilePath: enviroments[process.env.NODE_ENV] || '.env',
  load: [config],
  isGlobal: true,
  validationSchema: Joi.object({
    TYPEORM_CONNECTION: Joi.string().required(),
    TYPEORM_HOST: Joi.string().required(),
    TYPEORM_PORT: Joi.number().required(),
    TYPEORM_DATABASE: Joi.string().required(),
    TYPEORM_USERNAME: Joi.string().required(),
    TYPEORM_PASSWORD: Joi.string().required(),
    TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
    TYPEORM_LOGGING: Joi.boolean().required(),
    TYPEORM_ENTITIES: Joi.string().required(),
    TYPEORM_MIGRATIONS: Joi.string().required(),
    TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
    TYPEORM_MIGRATIONS_TABLE_NAME: Joi.string().required(),
  }),
};
