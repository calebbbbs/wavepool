import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dotenv from 'dotenv';

dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_URL } = process.env;

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  logging: true,
  host: DB_URL,
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'wavepool',
  synchronize: true,
  entities: [
     'server/db/entities/*.ts',
  ],
};

export default typeOrmConfig;
