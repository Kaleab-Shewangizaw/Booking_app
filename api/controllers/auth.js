import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import createError from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcryptjs.genSalt(10);
    const hash = bcryptjs.hashSync(req.body.password, 10);
    //here is the error in the code
    /*"success": false,
	"status": 500,
	"message": "Illegal arguments: string, object",
	"stack": "Error: Illegal arguments: string, object\n    at bcrypt.hashSync  */
    //the solution is to change the code to this
    //const hash = bcryptjs.hashSync(req.body.password, 10);
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
    const { password, isAdmin, ...otherDetails } = user._doc;
    //the error is this
    /*	"success": false,
	"status": 500,
	"message": "Spread syntax requires ...iterable[Symbol.iterator] to be a function",*/
    //the solution is to change the code to this
    //const { password, isAdmin, ...otherDetails } = {...user._doc};

    res.status(200).json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
