import 'reflect-metadata';

import { createConnection } from 'typeorm';
import typeOrmConfig from "./dbConfig"

(async () => {
  const conn = await createConnection(typeOrmConfig);
  console.log('Connected to WP database.');

  await conn.close();
  console.log('Connection to WP database closed.');
})();
