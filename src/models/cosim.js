const cosim = (sequelize, DataTypes) => {
    const Cosim = sequelize.define('Cosim', {
        book_i: DataTypes.BIGINT,
        book_j: DataTypes.BIGINT,
        similarity: DataTypes.DECIMAL(2)
    });
  
    Cosim.associate = models => {
        Cosim.belongsTo(models.User);
        Cosim.belongsTo(models.Book);
    };
  
    return Cosim;
  };
  
  export default cosim;