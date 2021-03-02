const user = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    pseudo: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postcode: DataTypes.INTEGER,
    country_code: DataTypes.INTEGER
    });

  User.associate = models => {
    User.hasMany(models.Books, { onDelete: 'CASCADE' });
    User.hasOne(models.Cosim);
    User.hasOne(models.ALS);
    User.hasOne(models.KMeans);
    User.hasMany(models.Merchant);
    User.hasMany(models.Ratings);
    User.belongsTo(models.Orders);
    User.hasMany(models.SaveAs)
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { email: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  return User;
};

export default user;
