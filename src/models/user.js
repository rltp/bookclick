import bcrypt from "bcrypt";
import uuid from "uuid";
import jwt from "jsonwebtoken";

const User = (sequelize, DataTypes) => {
	const User = sequelize.define('users', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			defaultValue: () => uuid.v1().toString()
		},
		pseudo: { type: DataTypes.STRING, unique: true },
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		address: DataTypes.STRING,
		city: DataTypes.STRING,
		postcode: DataTypes.INTEGER,
		country_code: DataTypes.STRING,
		email: { type: DataTypes.STRING, unique: true },
		password: { type: DataTypes.STRING, validate: { notEmpty: true } },
		confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
		confirmationToken: { type: DataTypes.STRING, defaultValue: "", allowNull: true },
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('NOW()')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('NOW()')
		}
	}, {
		indexes: [
			{
				unique: true,
				fields: ['pseudo', 'email']
			}
		]
	});

	User.associate = models => {
		User.hasMany(models.Recommenders.ALS, { foreignKey: 'user_id' });
	};

	// Instances

	User.prototype.isValidPassword = function isValidPassword(password) {
		return bcrypt.compareSync(password, this.password);
	};

	User.prototype.generateJWT = function generateJWT() {
		return jwt.sign(
			{
				email: this.email,
				confirmed: this.confirmed
			},
			process.env.JWT_SECRET
		);
	};

	User.prototype.generateResetPasswordToken = function generateResetPasswordToken() {
		return jwt.sign(
			{ id: this.id },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);
	};

	User.prototype.toAuthJSON = function toAuthJSON() {
		return {
			email: this.email,
			confirmed: this.confirmed,
			token: this.generateJWT()
		};
	}

	User.prototype.setPassword = async function setPassword(password) {
		this.password = await bcrypt.hashSync(password, 10);
	};

	User.prototype.setConfirmationToken = function setConfirmationToken() {
		this.confirmationToken = this.generateJWT();
	};

	User.prototype.generateConfirmationUrl = function generateConfirmationUrl() {
		return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
	};

	User.prototype.generateConfirmationUrl = function generateConfirmationUrl() {
		return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
	};

	User.prototype.generateResetPasswordLink = function generateResetPasswordLink() {
		return `${process.env.HOST}/reset_password/${this.generateResetPasswordToken()}`;
	};

	// Classes

	User.getPublicInfos = async id => {
		return await User.findOne({ attributes: ['pseudo', 'city', 'createdAt'], where: { id: id } });
	}

	User.getPrivateInfos = async id => {
		return await User.findOne({ attributes: 
			['pseudo',
			'firstname',
			'lastname',
			'address',
			'city',
			'postcode',
			'country_code',
			'email',
			'createdAt'
			], where: { id: id }
		});
	}

	User.edit = async (userID, values) => {
		return await User.update(values, { where: { id: userID } })
	}

	return User;
};

module.exports = User;
