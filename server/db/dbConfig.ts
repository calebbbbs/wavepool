import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const { CLIENT_URL, DB_USERNAME, DB_PASSWORD } = process.env;

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: CLIENT_URL,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'wavepool',
  synchronize: true,
  logging: false,
  entities: [
    'server/db/entities/**/*.ts',
  ],
};

export default typeOrmConfig;
