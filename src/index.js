import cors from 'cors';
import express from 'express';
import { body } from 'express-validator'
import models, { sequelize } from './models';
import routes from './routes';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(body('*').escape())

app.use(async (req, res, next) => {
	req.context = { models };
	next();
});

// Routes

app.use('/auth', routes.auth)
app.use('/books', routes.books)
app.use('/users', routes.users)
app.use('/me', routes.me)


// Start

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync, logging: console.log() }).then(async () => {
	app.listen(process.env.PORT || 5000, () =>
		console.log(`Les bonbonnes sont remplies de cocaïne !`),
	);
});