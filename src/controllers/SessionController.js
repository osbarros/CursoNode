import SessionModel from "../models/SessionModel.js";
import * as SessionValidator from "../validators/SessionValidator.js";

export async function get(req, res) {
  try {
    const sessions = await SessionModel.find({ endedAt: null })
      .populate("user")
      .exec();
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Error in retrieving users data: ${error}` });
  }
}
export async function getById(req, res) {}
export async function getByUserId(req, res) {
  try {
    const { userId } = SessionValidator.getByUserId(req);
    const sessions = await SessionModel.find({ user: userId }).exec();
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error in retrieving sessions data by user id: ${error}`,
    });
  }
}
export async function create(req, res) {
  try {
    const { userId } = SessionValidator.create(req);

    const activeSession = await SessionModel.findOne({
      user: userId,
      endedAt: null,
    }).exec();
    if (activeSession)
      return res.status(500).json({ message: "User already logged in" });

    const newSession = await SessionModel.create({ user: userId });
    res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Error in registering a new session: ${error}` });
  }
}
export async function endSession(req, res) {
  try {
    const { userId } = SessionValidator.endSession(req);

    const foundSession = await SessionModel.findOne({
      user: userId,
      endedAt: null,
    }).exec();
    if (!foundSession) res.status(500).json({ message: "Session not found" });

    const updatedSession = await foundSession
      .set({ endedAt: Date.now() })
      .save();

    res.status(200).json(updatedSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error in ending session: ${error}`,
    });
  }
}
export async function update(req, res) {}
export async function destroy(req, res) {}
