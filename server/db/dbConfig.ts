import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Omerta89',
  database: 'wavepool',
  synchronize: true,
  logging: false,
  entities: [
  ],
};

export default { typeOrmConfig };
