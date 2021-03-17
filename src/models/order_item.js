const order_item = (sequelize, DataTypes) => {
    const Order_Item = sequelize.define('order_items', {
        order_id: DataTypes.STRING,
        offer_id: DataTypes.STRING,
        quantity: DataTypes.INTEGER
    },
    {
      timestamps: false
    });
  
    Order_Item.associate = models => {
        Order_Item.belongsTo(models.Offer, {foreignKey: 'offer_id'});
        Order_Item.belongsTo(models.Order, {foreignKey: 'order_id'});
    };
  
    return Order_Item;
  };
  
  export default order_item;