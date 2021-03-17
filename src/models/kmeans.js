const kmeans = (sequelize, DataTypes) => {
    const KMeans = sequelize.define('kmeans', {
        user_id: DataTypes.STRING,
        book_id: DataTypes.STRING,
        prediction: DataTypes.DECIMAL(2)
    },
    {
      timestamps: false
    });
  
    return KMeans;
  };
  
  export default kmeans;