const als = (sequelize, DataTypes) => {
    const ALS = sequelize.define('ALS', {
        user_id: DataTypes.UUID,
        book_id: DataTypes.BIGINT,
        prediction: DataTypes.DECIMAL(2)
    });
  
    ALS.associate = models => {
        ALS.belongsTo(models.User);
        ALS.belongsTo(models.Book);
    };
  
    return ALS;
  };
  
  export default als;