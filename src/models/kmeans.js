const kmeans = (sequelize, DataTypes) => {
    const KMeans = sequelize.define('KMeans', {
        user_id: DataTypes.UUID,
        book_id: DataTypes.BIGINT,
        prediction: DataTypes.DECIMAL(2)
    });
  
    KMeans.associate = models => {
        KMeans.hasOne(models.User);
        KMeans.hasOne(models.Book);
    };
  
    return KMeans;
  };
  
  export default kmeans;