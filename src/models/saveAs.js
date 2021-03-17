const saveAs = (sequelize, DataTypes) => {
    const saveAs = sequelize.define('saveAs', {
        user_id: DataTypes.STRING,
        book_id: DataTypes.STRING,
        category: DataTypes.STRING
    },
    {
      timestamps: false
    });
  
    saveAs.associate = models => {
        saveAs.belongsTo(models.User, {foreignKey: 'user_id'});
        saveAs.belongsTo(models.Book, {foreignKey: 'book_id'});
    };
  
    return saveAs;
  };
  
  export default saveAs;