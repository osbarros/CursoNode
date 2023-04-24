import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import * as AuthValidator from "../validators/AuthValidator.js";

export async function login(req, res) {
  try {
    const { email, password } = AuthValidator.login(req);
    const foundUser = await UserModel.findOne({ email })
      .select("+password") // Add the password to the foundUser object
      .exec();
    if (!foundUser)
      return res.status(401).json({ message: "Wrong email or password" });

    const isMatch = await foundUser.comparePasswords(password);
    if (!isMatch) res.status(401).json({ message: "Wrong email or password" });

    const { password: pwd, ...user } = foundUser.toObject(); // Taking off the password
    const token = jwt.sign(
      {
        user,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: +process.env.TOKEN_EXPIRE } // in seconds
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      message: `Error in login to the system: ${error}`,
    });
  }
}
