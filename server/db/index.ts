import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from 'cors';

import { createConnection } from 'typeorm';
import typeOrmConfig from './dbConfig';

dotenv.config();

(async () => {
  const conn = await createConnection(typeOrmConfig);
  console.log('Connected to WP database.');

  await conn.close();
  console.log('Connection to WP database closed.');
})();
