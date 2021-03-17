const book = (sequelize, DataTypes) => {
  const Book = sequelize.define('books', {
    isbn:{
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
    //Book.belongsTo(models.Offer, {foreignKey: 'isbn', targetKey: 'book_id'});
    Book.hasMany(models.ALS, {foreignKey: 'book_id', sourceKey: 'isbn'});
    Book.hasMany(models.KMeans, {foreignKey: 'book_id', sourceKey: 'isbn'});
  };

  return Book;
};

export default book;