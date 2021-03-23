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
    //"SELECT C.book_j, B.title FROM public.Cosim JOIN public.Books ON C.book_i = B.book_id WHERE book_i = :book_i ORDER BY similarity DESC"
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
      `SELECT "isbn", "prediction", "title", "publication_year", "authors" 
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
    //"SELECT A.book_id, B.title, A.prediction FROM public.ALs JOIN public.Books B ON A.book_id = B.book_id WHERE user_id = 55 AND book_id = 55",
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