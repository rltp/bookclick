import Sequelize from 'sequelize';
import dotenv from 'dotenv'
import fs from 'fs';
import path from 'path';

dotenv.config()

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const basename = path.basename(__filename);
let models = {};
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const name = file.slice(0, -3)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    models[name] = model;
  });

console.log(models)

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
