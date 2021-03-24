import models from './index';
import {QueryTypes} from 'sequelize';

const Recommenders = (sequelize, DataTypes) => {
  const ALS = sequelize.define('als', {
      user_id: DataTypes.STRING,
      book_id: DataTypes.STRING,
      prediction: DataTypes.DECIMAL(3,2)
  },
  {
    timestamps: false
  });

  ALS.associate = models => {
    ALS.belongsTo(models.User, {foreignKey: 'user_id'});
    ALS.belongsTo(models.Book, {foreignKey: 'book_id'});
  }

  const Cosim = sequelize.define('cosim', {
      book_i: DataTypes.STRING,
      book_j: DataTypes.STRING,
      similarity: DataTypes.DECIMAL(3,2)
    },
    {
      timestamps: false
    });

  Cosim.associate = models => {
    Cosim.belongsTo(models.Book, { foreignKey: 'book_i' });
    Cosim.belongsTo(models.Book, { foreignKey: 'book_j' });
  };

  Cosim.similarityTop = async (bookID) =>{
    return await sequelize.query(
      `SELECT "similarity", "title", "publication_year", "authors" , "image_url" FROM "cosims" AS "cosim" LEFT OUTER JOIN "books" AS "book" ON "cosim"."book_j" = "book"."isbn" WHERE "cosim"."book_i" = :book_id ORDER BY "cosim"."similarity" DESC;`,
      {
        replacements: { book_id: bookID },
        type: QueryTypes.SELECT
      }
    );
    return await Cosim.findAll(
      {
        attributes: ['book_j', 'title', 'authors'],
        where: { book_i: bookID },
        include: [{model: models.Book}],
        order: [ ['similarity', 'DESC']],
        limit: 5
      }
    )
  }

  ALS.colaborativeTop = async (userID) =>{

    return await sequelize.query(
      `SELECT "isbn", "prediction", "title", "publication_year", "authors" , "image_url"
      FROM "als" AS "als" 
      LEFT OUTER JOIN "books" AS "book" 
      ON "als"."book_id" = "book"."isbn" 
      WHERE "als"."user_id" = :user_id 
      ORDER BY "als"."prediction" DESC LIMIT 10;`,
      {
        replacements: { user_id: userID },
        type: QueryTypes.SELECT
      }
    );

    return await ALS.findAll(
      {
        
        attributes: ['book_id', 'prediction'],
        where: { user_id: userID },
        order: [['prediction', 'DESC']],
        include: [{ model: models.Book, attributes: ['title', 'authors', 'image_url']}],
        limit: 10
      }
    )
  }

  ALS.colaborativeScore = async (userID, bookID) => {

    return await sequelize.query(
      `SELECT "prediction"
      FROM "als" AS "als" 
      LEFT OUTER JOIN "books" AS "book" 
      ON "als"."book_id" = "book"."isbn" 
      WHERE "als"."user_id" = :user_id  AND "als"."book_id" = :book_id
      ORDER BY "als"."prediction" DESC LIMIT 10;`,
      {
        replacements: { user_id: userID, book_id: bookID },
        type: QueryTypes.SELECT
      }
    );

    return await ALS.findOne(
      {
        attributes: ['book_id', 'title', 'authors', 'prediction'],
        where: { user_id: userID, book_id: bookID },
        include: [models.Book],
        order: [['prediction', 'DESC']],
        limit: 10
      }
    )
  }

  return { ALS, Cosim };
};

module.exports = Recommenders