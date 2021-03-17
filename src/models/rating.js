const ratings = (sequelize, DataTypes) => {
    const Ratings = sequelize.define('ratings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: DataTypes.STRING,
        book_id: DataTypes.STRING, 
        score: DataTypes.INTEGER,
        comment: DataTypes.STRING
    },
    {
      timestamps: false
    });
  
    Ratings.associate = models => {
        Ratings.belongsTo(models.User, {foreignKey: 'user_id'});
        Ratings.belongsTo(models.Book, {foreignKey: 'book_id'});
    };
  
    return Ratings;
  };
  
  export default ratings;