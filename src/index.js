import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Routes

app.use('/merchants', routes.merchants); // connected as a merchant
app.use('/users', routes.users); // list of all users, profiles...
app.use('/books', routes.books); // infos of a book, search bar, search by genre - recommend based on all users (most popular...)
app.use('/me', routes.me) // home : recommend, mylist - settings

// Start

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Les bonbonnes sont remplies de cocaïne !`),
  );
});