
//import typeOrmConfig from '../server/db/dbConfig';
import { createConnection, getConnection } from 'typeorm';
import User from '../server/db/entities/user';
import dotenv from 'dotenv';
dotenv.config();

async function seedDB() {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'omerta89',
    database: 'wavepool',
    synchronize: true,
    logging: false,
    entities: [
      __dirname + 'server/db/entities/*.ts',
    ],
  })

  await getConnection()
  .createQueryBuilder()
  .insert()
  .into(User)
  .values({
    user_id: 504,
    user_name: 'Mr. Okra',
  })
  .execute();
}

seedDB();

