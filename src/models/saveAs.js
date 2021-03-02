const saveAs = (sequelize, DataTypes) => {
    const saveAs = sequelize.define('SaveAs', {
        user_id: DataTypes.UUID,
        book_id: DataTypes.BIGINT,
        category: DataTypes.STRING
    });
  
    saveAs.associate = models => {
        saveAs.hasOne(models.User);
        saveAs.hasOne(models.Book);
    };
  
    return saveAs;
  };
  
  export default saveAs;