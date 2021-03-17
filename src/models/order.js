const order = (sequelize, DataTypes) => {
    const Order = sequelize.define('orders', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        user_id: DataTypes.STRING,
        status: DataTypes.STRING,
        created_at: DataTypes.STRING,
        shipping_adress: DataTypes.STRING,
        amount: DataTypes.DECIMAL(2),
        method: DataTypes.STRING
    },
    {
      timestamps: false
    });
  
    Order.associate = models => {
        Order.belongsTo(models.User, {foreignKey: 'user_id'});
    };
  
    return Order;
  };
  
  export default order;