import SessionModel from "../models/SessionModel.js";
import UserModel from "../models/UserModel.js";

export async function getActive(req, res) {
  try {
    const timezone =
      req.query.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    const sessions = await SessionModel.aggregate([
      {
        $match: {
          endedAt: null,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          durationInDateFormat: {
            $toDate: {
              $dateDiff: {
                startDate: "$startedAt",
                endDate: new Date(),
                unit: "millisecond",
                timezone,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: "$user._id",
          name: "$user.name",
          role: "$user.role",
          status: "$user.status",
          startedAt: {
            $dateToString: {
              date: "$startedAt",
              format: "%H:%M",
              timezone,
            },
          },
          duration: {
            $dateToString: {
              date: "$durationInDateFormat",
              format: "%H:%M",
            },
          },
        },
      },
      {
        $sort: {
          startedAt: -1,
        },
      },
    ]);

    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Error in retrieving users data: ${error}` });
  }
}

export async function create(req, res) {
  try {
    const { userId } = req.body;

    const foundUser = await UserModel.findById(userId).lean().exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const activeSession = await SessionModel.findOne({
      user: userId,
      endedAt: null,
    })
      .lean()
      .exec();
    if (activeSession)
      return res.status(409).json({ message: "User already logged in" });

    const newSession = await SessionModel.create({
      user: userId,
      startedAt: new Date(),
    });

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
    const { userId } = req.body;

    const foundUser = await UserModel.findById(userId).lean().exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const foundSession = await SessionModel.findOne({
      user: userId,
      endedAt: null,
    }).exec();
    if (!foundSession)
      return res.status(404).json({ message: "Session not found" });

    await foundSession.set({ endedAt: Date.now() }).save();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error in ending session: ${error}`,
    });
  }
}
