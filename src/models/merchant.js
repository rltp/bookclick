const merchant = (sequelize, DataTypes) => {
    const Merchant = sequelize.define('Merchants', {
      id: {
        type: DataTypes.UUID,
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
      admin_id: DataTypes.UUID
      });
  
      Merchant.associate = models => {
        Merchant.hasMany(models.Offer);
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