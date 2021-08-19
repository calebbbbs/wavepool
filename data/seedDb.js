
import typeOrmConfig from '../server/db/dbConfig';
import { createConnection, getConnection } from 'typeorm';
import User from '../server/db/entities/user'


async function seedDB() {
  await createConnection(typeOrmConfig)

  await getConnection()
  .createQueryBuilder()
  .insert()
  .into(User)
  .values({
    user_id: 666,
    user_name: 'satan',
  })
  .execute();
}

//seedDB();

