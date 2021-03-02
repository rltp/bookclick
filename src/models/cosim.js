const cosim = (sequelize, DataTypes) => {
    const Cosim = sequelize.define('Cosim', {
        user_id: DataTypes.UUID,
        book_id: DataTypes.BIGINT,
        similarity: DataTypes.DECIMAL(2)
    });
  
    Cosim.associate = models => {
        Cosim.hasOne(models.User);
        Cosim.hasOne(models.Book);
    };
  
    return Cosim;
  };
  
  export default cosim;