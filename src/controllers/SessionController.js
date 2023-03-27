import SessionModel from "../models/SessionModel.js";
import * as SessionValidator from "../validators/SessionValidator.js";

export async function get(req, res) {
  try {
    const sessions = await SessionModel.find({ endedAt: null })
      .populate({ path: "user", select: "name role message" })
      .lean()
      .exec();
    res.status(200).json(sessions);
  } catch (error) {
    console.error(err);
    res
      .status(500)
      .json({ message: `Error in retrieving users data: ${error}` });
  }
}
export async function getById(req, res) {}
export async function getByUserId(req, res) {
  try {
    const { userId } = SessionValidator.getByUserId(req);
    const sessions = await SessionModel.find({ user: userId }).lean().exec();
    res.status(200).json(sessions);
  } catch (error) {
    console.error(err);
    res.status(500).json({
      message: `Error in retrieving sessions data by user id: ${error}`,
    });
  }
}
export async function create(req, res) {
  try {
    const { user } = SessionValidator.create(req);

    const activeSession = await SessionModel.findOne({
      user,
      endedAt: null,
    }).exec();
    if (activeSession)
      return res.status(500).json({ message: "User already logged in" });

    const newSession = await SessionModel.create({ user });
    res.status(201).json(newSession);
  } catch (error) {
    console.error(err);
    res
      .status(500)
      .json({ message: `Error in registering a new user: ${error}` });
  }
}
export async function update(req, res) {}
export async function destroy(req, res) {}
