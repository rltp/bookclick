import models from './index';
import { Op } from "sequelize";

const Book = (sequelize, DataTypes) => {
	const Book = sequelize.define('books', {
		isbn: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		authors: DataTypes.TEXT,
		title: DataTypes.STRING,
		publication_year: DataTypes.INTEGER,
		language_code: DataTypes.STRING,
		image_url: DataTypes.STRING,
		tag_name: DataTypes.TEXT
	},
		{
			timestamps: false
		});

	Book.associate = models => {
		Book.hasMany(models.Recommenders.ALS, { foreignKey: 'book_id', sourceKey: 'isbn' });
	};

	Book.getList = async (start, end) => {
		let limit = Math.abs(end - start)
		return await Book.findAll({ offset: start, limit: limit });
	}

	Book.getInfos = async isbn => {
		return await Book.findOne({ where: { isbn: isbn } })
	}

	Book.search = async query => {
		return await Book.findAll({
			where: {
				$or: [
					{ 'title': { [Op.iLike]: '%' + query + '%' } },
					{ 'authors': { [Op.iLike]: '%' + query + '%' } },
					{ 'tag_name': { [Op.iLike]: '%' + query + '%' } },
					{ '$ratings.comment$': { [Op.iLike]: '%' + query + '%' } }
				]
			},
			include: [{ model: models.rating }]
		})
	}

	Book.searchByCategory = async category => {
		return await Book.findAll({
			where: { 'tag_name': { [Op.iLike]: '%' + category + '%' } }
		})
	}

	return Book;
};

module.exports = Book;