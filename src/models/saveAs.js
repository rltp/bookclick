import { Op } from "sequelize"

const saveAs = (sequelize, DataTypes) => {
	const saveAs = sequelize.define('saveAs', {
		user_id: DataTypes.STRING,
		book_id: DataTypes.STRING,
		category: DataTypes.STRING
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
				}
			}
		)
	};

	saveAs.getPrivateList = async userID => {
		//"SELECT S.book_id, B.title, B.authors FROM public.SaveAs S JOIN public.Books B ON S.book_id = B.book_id WHERE user_id = :user_id AND S.category = 'to-read' OR S.category = 'favorites' OR S.category = 'owned'",
		return await saveAs.findAll({ where: { user_id: userID } })
	}

	saveAs.getListGrouped = async (userID, type) => {
		//"SELECT B.book_id, B.title, COUNT(B.authors) as Occur_authors FROM public.Books B JOIN public.Ratings R ON B.book_id = R.book_id GROUP BY B.authors HAVING Occur_authors > 2 ORDER BY Occur_athors DESC"
	}

	saveAs.saveBook = async (userID, type, bookID) => {
		//"INSERT INTO public.SaveAs (user_id, book_id, category) VALUES (:user_id, :book_id, :category)"
	}

	return saveAs;
};

module.exports = saveAs;