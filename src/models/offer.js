const offer = (sequelize, DataTypes) => {
    const Offer = sequelize.define('offers', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        merchant_id: DataTypes.STRING,
        book_id: {
            type: DataTypes.STRING
        },
        quantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(2),
        created_at: DataTypes.STRING
    },
    {
      timestamps: false
    });
  
    Offer.associate = models => {
        Offer.belongsTo(models.Merchant, {foreignKey: 'merchant_id'});
        Offer.belongsTo(models.Book, {foreignKey: 'book_id'});
    };
  
    return Offer;
  };
  
  export default offer;