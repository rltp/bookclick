const als = (sequelize, DataTypes) => {
    const ALS = sequelize.define('ALS', {
        user_id: DataTypes.UUID,
        book_id: DataTypes.BIGINT,
        prediction: DataTypes.DECIMAL(2)
    });
  
    ALS.associate = models => {
        ALS.hasOne(models.User);
        ALS.hasOne(models.Book);
    };
  
    return ALS;
  };
  
  export default als;