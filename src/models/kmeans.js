const kmeans = (sequelize, DataTypes) => {
    const KMeans = sequelize.define('KMeans', {
        user_id: DataTypes.UUID,
        book_id: DataTypes.BIGINT,
        prediction: DataTypes.DECIMAL(2)
    });
  
    KMeans.associate = models => {
        KMeans.belongsTo(models.User);
        KMeans.belongsTo(models.Book);
    };
  
    return KMeans;
  };
  
  export default kmeans;