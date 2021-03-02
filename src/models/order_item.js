const order_item = (sequelize, DataTypes) => {
    const Order_Item = sequelize.define('Order_Items', {
        order_id: DataTypes.UUID,
        offers_id: DataTypes.UUID,
        quantity: DataTypes.INTEGER
    });
  
    Order_Item.associate = models => {
        Order_Item.belongsToMany(models.Offers);
        Order_Item.belongsToMany(models.Orders);
    };
  
    return Order_Item;
  };
  
  export default order_item;