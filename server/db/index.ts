import { Pool, Client } from 'pg';
import { PORT } from './config';

const port = PORT || 3000;

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "nodedemo",
  password: "yourpassword",
  port: 5432,
};
