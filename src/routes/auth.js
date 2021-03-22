import express from "express";
import { sendResetPasswordEmail, sendConfirmationEmail } from "../mailer";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
	const { 
		pseudo, firstname, lastname,
		address, city, postcode, country_code,
		email, password
	} = req.body.user;
	console.log(req.body)
	
	const user = await req.context.models.User.build({
		'pseudo': pseudo,
		'firstname' : firstname,
		'lastname' : lastname,
		'email': email,
		'address': address,
		'city': city,
		'postcode': postcode,
		'country_code' : country_code
	})
	user.setPassword(password);
	user.setConfirmationToken();

	try{
		const saved = await user.save()
		sendConfirmationEmail(saved);
		res.status(200).json({ user: saved.toAuthJSON() });
	}catch( err ){
		res.status(400).json({ errors: err });
	}
});

router.post("/signin", async (req, res) => {
	console.log(req.body.credentials)
	const { email, password } = req.body.credentials;
	
	const user = await req.context.models.User.findOne({where: { email: email }})

	if (user && user.isValidPassword(password))
		res.json({ user: user.toAuthJSON() });
	else
		res.status(400).json({ errors: { global: "Invalid credentials" } });
});

router.post("/confirmation", async (req, res) => {
	const token = req.body.token;

	const user = await req.context.models.User.findOne({ where: { confirmationToken: token } });
	
	if (!user) res.status(400).json({})

	user.confirmationToken = "";
	user.confirmed = true
	await user.save();
	
	user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
});

router.post("/reset_password_request", async (req, res) => {
	const user = await req.context.models.User.findOne({ email: req.body.email })
	if (user) {
		sendResetPasswordEmail(user);
		res.json({});
	} else {
		res.status(400).json({ errors: { global: "No such email" } });
	}
});

router.post("/validate_token", (req, res) => {
	jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
		if (err) res.status(401).json({});
		else res.json({});
	});
});

router.post("/reset_password",  async (req, res) => {
	const { password, token } = req.body.data;
	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			res.status(401).json({ errors: { global: "Invalid token" } });
		} else {
			const user = await req.context.models.User.findOne({ _id: decoded._id })
			if (user) {
				user.setPassword(password);
				user.save().then(() => res.json({}));
			} else {
				res.status(404).json({ errors: { global: "Invalid token" } });
			}
		}
	});
});

export default router;
