const als = (sequelize, DataTypes) => {
    const ALS = sequelize.define('als', {
        user_id: DataTypes.STRING,
        book_id: DataTypes.STRING,
        prediction: DataTypes.DECIMAL(2)
    },
    {
      timestamps: false
    });
  
    return ALS;
  };
  
  export default als;