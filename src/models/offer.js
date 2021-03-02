const offer = (sequelize, DataTypes) => {
    const Offer = sequelize.define('Offers', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        merchant_id: DataTypes.UUID,
        book_id: DataTypes.BIGINT, 
        quantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10,2),
        created_at: DataTypes.STRING
    });
  
    Offer.associate = models => {
        Offer.hasOne(models.Merchant);
        Offer.hasMany(models.Order_Item);
        Offer.hasMany(models.Book);
    };
  
    return Offer;
  };
  
  export default offer;