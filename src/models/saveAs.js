import { Op } from "sequelize"
import models from './index'

const saveAs = (sequelize, DataTypes) => {
	const saveAs = sequelize.define('saveAs', {
		user_id: DataTypes.STRING,
		book_id: DataTypes.STRING,
		category: DataTypes.STRING,
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('NOW()')
		}
	},{
		timestamps: false
	});

	saveAs.associate = models => {
		saveAs.belongsTo(models.User, { foreignKey: 'user_id' });
		saveAs.belongsTo(models.Book, { foreignKey: 'book_id' });
	};

	saveAs.getPublicList = async (userID) => {
		return await saveAs.findAll(
			{
				where:{ 
					user_id: userID ,
					[Op.or]: [
						{ category: 'to-read' },
						{ category: 'favorites' },
						{ category: 'owned' }
					]
				},
				include:[{
					model: models.Book,
					attributes: ['isbn', 'title','authors']
				}],
			}
		)
	};

	saveAs.getPrivateList = async userID => {
		return await saveAs.findAll({ 
			attributes: ['category'],
			where: { user_id: userID },
			include:[{
				model: models.Book,
				attributes: ['isbn', 'title','authors']
			}],
			exclude: ['id']
		})
	}

	saveAs.getListGrouped = async (userID, type) => {
		//"SELECT B.book_id, B.title, COUNT(B.authors) as Occur_authors FROM public.Books B JOIN public.Ratings R ON B.book_id = R.book_id GROUP BY B.authors HAVING Occur_authors > 2 ORDER BY Occur_athors DESC"
	}

	saveAs.saveBook = async (userID, type, bookID) => {
		return await saveAs.build({
			user_id: userID,
			book_id: bookID,
			category: type
		})
	}

	return saveAs;
};

module.exports = saveAs;