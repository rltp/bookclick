const ratings = (sequelize, DataTypes) => {
    const Ratings = sequelize.define('Ratings', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        user_id: DataTypes.UUID,
        book_id: DataTypes.BIGINT, 
        score: DataTypes.INTEGER,
        comment: DataTypes.STRING
    });
  
    Ratings.associate = models => {
        Ratings.belongsTo(models.User);
        Ratings.belongsTo(models.Book);
    };
  
    return Ratings;
  };
  
  export default ratings;