const cosim = (sequelize, DataTypes) => {
    const Cosim = sequelize.define('cosim', {
        book_i: DataTypes.STRING,
        book_j: DataTypes.STRING,
        similarity: DataTypes.DECIMAL(2)
    },
    {
      timestamps: false
    });
  
    Cosim.associate = models => {
        Cosim.belongsTo(models.Book, {foreignKey: 'book_i'});
        Cosim.belongsTo(models.Book, {foreignKey: 'book_j'});
      };

    return Cosim;
  };
  
  export default cosim;