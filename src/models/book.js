const book = (sequelize, DataTypes) => {
  const Book = sequelize.define('Books', {
    isbn:{
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    authors: DataTypes.STRING,
    title: DataTypes.STRING, 
    tag_name: DataTypes.STRING,
    publication_year: DataTypes.INTEGER,
    language_code: DataTypes.STRING,
    image_url: DataTypes.STRING
  });

  Book.associate = models => {
    Book.hasMany(models.Offer);
    Book.hasMany(models.ALS);
    Book.hasMany(models.Cosim);
    Book.hasMany(models.KMeans);
    Book.hasMany(models.Ratings);
    Book.hasMany(models.saveAs);
  };

  return Book;
};

export default book;
