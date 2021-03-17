const merchant = (sequelize, DataTypes) => {
    const Merchant = sequelize.define('merchants', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      merchant_name: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      postcode: DataTypes.INTEGER,
      country_code: DataTypes.INTEGER,
      location: { 
        type: 'Point'
      },
      created_at: DataTypes.STRING,
      admin_id: DataTypes.STRING
      },
      {
        timestamps: false
      });
  
      Merchant.associate = models => {
        Merchant.belongsTo(models.User, {foreignKey: 'admin_id'});
    };
  
    Merchant.findByLogin = async login => {
      let merchant = await Merchant.findOne({
        where: { email: login },
      });
  
      if (!merchant) {
        merchant = await Merchant.findOne({
          where: { email: login },
        });
      }
  
      return merchant;
    };
  
    return Merchant;
  };
  
  export default merchant;