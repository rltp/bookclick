import { DataTypes } from "sequelize"
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

    Rating.bestBooks = async () => {
        return Rating.findAll({
            attributes: ['book_id', [models.sequelize.fn('AVG', sequelize.col('score')), 'ratingAvg']],
            group: ['book_id'],
            order: [[models.sequelize.fn('AVG', models.sequelize.col('score')), 'DESC']]
        })
    }

    Rating.popularBooks = async () => {
        return Rating.findAll({
            attributes: ['book_id', [models.sequelize.fn('COUNT', sequelize.col('score')), 'ratingAvg']],
            group: ['book_id'],
            order: [[models.sequelize.fn('COUNT', models.sequelize.col('score')), 'DESC']]
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
            include: [User],
            order:[['createdAt', 'DESC']]
        })
    }

    Rating.removeCommentFromRatingID = async (RatingID) => {
        return await User.update({ comment: '' }, { where: { id: RatingID } })
    }

    return Rating;
  };
  
module.exports = Rating;