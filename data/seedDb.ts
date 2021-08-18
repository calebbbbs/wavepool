import typeOrmConfig from '../server/db/dbConfig';
import { createConnection } from 'typeorm';


async function seedDB() {
  const db = await createConnection(typeOrmConfig).catch(err => console.log(err));
}



