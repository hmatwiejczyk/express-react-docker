import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import keys from './keys/keys';

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// PG client setup
const pool = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort as number | undefined,
});
pool.on('error', () => console.log('Lost PG connection'));
pool
  .query('CREATE TABLE IF NOT EXISTS version (version VARCHAR(128))')
  .catch((err) => console.log(err));

app.get('/version', async (req: Request, res: Response) => {
  await pool.query('INSERT INTO version (version) values($1)', [process.env.npm_package_version]);
  const version = await pool.query('SELECT * from version');
  res.send(version.rows[0]);
});

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
