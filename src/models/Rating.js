import models from './index';
import { Op } from "sequelize";
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
            attributes: ['book.isbn', 'book.title', 'book.authors', 'book.image_url', [sequelize.fn('AVG', sequelize.col('ratings.score')), 'score']],
            where: { '$book.publication_year$': { [Op.gte]: 2015} },
            group: ['ratings.book_id', 'book.isbn'],
            order: [[sequelize.fn('AVG', sequelize.col('ratings.score')), 'DESC']],
            include: [{ model: models.Book, attributes: []}],
            limit: 10,
            raw: true
        })
    }

    Rating.popularsBooks = async () => {
        return await Rating.findAll({
            attributes: ['book.isbn', 'book.title', 'book.authors', 'book.image_url', [sequelize.fn('COUNT', sequelize.col('ratings.score')), 'count']],
            where: { '$book.publication_year$': { [Op.gte]: 2015} },
            group: ['ratings.book_id', 'book.isbn'],
            order: [[sequelize.fn('COUNT', sequelize.col('ratings.score')), 'DESC']],
            include: [{ model: models.Book, attributes: []}],
            limit: 10,
            raw: true
        })
    }
  
    Rating.addRate = async (userID, bookID, score, comment) => {
        return await Rating.build({
            user_id: userID,
            book_id: bookID,
            score: score, 
            comment: comment
        }).save()
    }

    Rating.getCommentsByBookID =  async (bookID) =>{
        return await Rating.findAll({
            attributes: ['user_id', 'user.pseudo', 'comment', 'createdAt'],
            where: { book_id: bookID, comment: {[Op.ne]: ''} },
            include: [{model: models.User, attributes: ['pseudo']}],
            order:[['createdAt', 'DESC']]
        })
    }

    Rating.removeCommentFromRatingID = async (RatingID) => {
        return await User.update({ comment: '' }, { where: { id: RatingID } })
    }

    return Rating;
  };
  
module.exports = Rating;