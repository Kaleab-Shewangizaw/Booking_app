import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcryptjs.genSalt(10);
    const hash = bcryptjs.hashSync(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return next(createError(401, "Invalid password"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { HttpOnly: true })
      .status(200)
      .json({ ...otherDetails });
    //we can also use res.cookie("access_token", token, { httpOnly: true }).status(200).json({ ...otherDetails });

    //the error is
    /*	"success": false,
	"status": 500,
	"message": "secretOrPrivateKey must have a value",*/

    //the solution is to add the secret key in the .env file
  } catch (err) {
    next(err);
  }
};
