import { config } from 'dotenv';
config();

import express, { json } from 'express';
import { connect } from 'mongoose';
import apiRoutes from './routes/api.routes.js';

const app = express();

app.use(json());

const PORT = process.env.PORT || 3020;

async function main() {
  connect(process.env.DB_URI);
  console.log('Connected to DB');

  app.use('', apiRoutes);

  app.listen(PORT, () => {
    console.log('App is live');
  })
}

main()
  .catch(console.error);
