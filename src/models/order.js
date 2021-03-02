const order = (sequelize, DataTypes) => {
    const Order = sequelize.define('Orders', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        user_id: DataTypes.UUID,
        status: DataTypes.STRING,
        created_at: DataTypes.STRING,
        shipping_adress: DataTypes.STRING,
        amount: DataTypes.DECIMAL(2),
        method: DataTypes.STRING
    });
  
    Order.associate = models => {
        Order.hasMany(models.Order_Item);
        Order.hasOne(models.User);
    };
  
    return Order;
  };
  
  export default order;