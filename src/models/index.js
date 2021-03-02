import Sequelize from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user'),
  Books: sequelize.import('./book'),
  Merchant: sequelize.import('./merchant'),
  Order: sequelize.import('./order'),
  Offer: sequelize.import('./offer'),
  Order_Item: sequelize.import('./order_item'),
  Ratings: sequelize.import('./rating'),
  saveAs: sequelize.import('./saveAs'),
  ALS: sequelize.import('./ALS'),
  Cosim: sequelize.import('./cosim'),
  KMeans: sequelize.import('./kmeans')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
