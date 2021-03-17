const user = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    pseudo: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postcode: DataTypes.INTEGER,
    country_code: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
    });

  User.associate = models => {
    User.hasMany(models.ALS, {foreignKey: 'user_id'});
    User.hasMany(models.KMeans, {foreignKey: 'user_id'});
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
