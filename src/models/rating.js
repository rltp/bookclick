import models from './index';

import uuid from 'uuid';

const Rating = (sequelize, DataTypes) => {
    const Rating = sequelize.define('ratings', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuid.v1().toString()
        },
        user_id: DataTypes.STRING,
        book_id: DataTypes.STRING, 
        score: DataTypes.INTEGER,
        comment: { type: DataTypes.STRING, defaultValue: "" },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
    },
    {
      timestamps: false
    });
  
    Rating.associate = models => {
        Rating.belongsTo(models.User, {foreignKey: 'user_id'});
        Rating.belongsTo(models.Book, {foreignKey: 'book_id'});
    };

    Rating.bestsBooks = async () => {
        return await Rating.findAll({
            attributes: ['book_id', [sequelize.fn('AVG', sequelize.col('ratings.score')), 'ratingAvg']],
            group: ['ratings.book_id', 'book.isbn'],
            order: [[sequelize.fn('AVG', sequelize.col('ratings.score')), 'DESC']],
            include: [{ model: models.Book, attributes: ['title', 'authors']}],
            limit: 10
        })
    }

    Rating.popularsBooks = async () => {
        return await Rating.findAll({
            attributes: ['book_id', [sequelize.fn('COUNT', sequelize.col('ratings.score')), 'ratingCount']],
            group: ['ratings.book_id', 'book.isbn'],
            order: [[sequelize.fn('COUNT', sequelize.col('ratings.score')), 'DESC']],
            include: [{ model: models.Book, attributes: ['title', 'authors']}],
            limit: 10
        })
    }
  
    Rating.addRate = async (userID, bookID, score, comment) => {
        return await Rating.build({
            user_id: userID,
            book_id: bookID,
            score: score, 
            comment: comment
        })
    }

    Rating.getCommentsByBookID =  async (bookID) =>{
        return await saveAs.findAll({
            attributes: ['user_id', 'pseudo', 'comment', 'createdAt'],
            where: { book_id: bookID, comment: {[Op.ne]: ''} },
            include: [models.User],
            order:[['createdAt', 'DESC']]
        })
    }

    Rating.removeCommentFromRatingID = async (RatingID) => {
        return await User.update({ comment: '' }, { where: { id: RatingID } })
    }

    return Rating;
  };
  
module.exports = Rating;