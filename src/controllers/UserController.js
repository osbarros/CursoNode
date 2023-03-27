import UserModel from "../models/UserModel.js";
import * as UserValidator from "../validators/UserValidator.js";

export async function get(req, res) {
  try {
    const users = await UserModel.find().lean().exec();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Error in retrieving users data: ${error}` });
  }
}
export async function getById(req, res) {
  try {
    const { id } = UserValidator.getById(req);

    const foundUser = await UserModel.findById(id).lean().exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(foundUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Error in retrieving user data: ${error}` });
  }
}
export async function create(req, res) {
  try {
    const { confirmPassword, ...inputData } = UserValidator.create(req);
    const { password, ...newUser } = (
      await UserModel.create(inputData)
    ).toObject();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Error in registering a new user: ${error}` });
  }
}
export async function update(req, res) {
  try {
    const { id, ...inputData } = UserValidator.update(req);

    const foundUser = await UserModel.findById(id).exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const updatedUser = await foundUser.set(inputData).save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error in updating user data: ${error}` });
  }
}
export async function destroy(req, res) {
  try {
    const { id } = UserValidator.getById(req);
    console.log(id);

    const foundUser = await UserModel.findById(id).exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    await foundUser.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error in deleting user data: ${error}` });
  }
}
