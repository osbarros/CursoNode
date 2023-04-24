import mongoose from "mongoose";
import SessionModel from "../models/SessionModel.js";
import * as SessionValidator from "../validators/SessionValidator.js";

export async function get(req, res) {
  try {
    const sessions = await SessionModel.find({ endedAt: null })
      .populate("user")
      .sort({ startedAt: -1 })
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
    })
      .lean()
      .exec();

    if (activeSession)
      return res.status(409).json({ message: "User already logged in" });

    const newSession = await SessionModel.create({
      user: userId,
      startedAt: new Date(),
    });
    const populatedNewSession = await newSession.populate("user");

    res.status(201).json(populatedNewSession);
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

    if (!foundSession)
      return res.status(404).json({ message: "Session not found" });

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

export async function getAllSessionsTotalTime(req, res) {
  try {
    const { userId } = SessionValidator.getAllSessionsTotalTime(req);
    console.log(new Date("26-03-2023"));

    const sessionsInfoByUser = await SessionModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
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
                endDate: "$endedAt",
                unit: "millisecond",
              },
            },
          },
        },
      },
      {
        $project: {
          "user._id": 1,
          "user.name": 1,
          "user.role": 1,
          startedAt: 1,
          endedAt: 1,
          durationInDateFormat: 1,
          formatedDuration: {
            $dateToString: {
              date: "$durationInDateFormat",
              format: "%H:%M",
            },
          },
        },
      },
    ]);
    // const totalTime = await SessionModel.aggregate([
    //   {
    //     $match: {
    //       user: new mongoose.Types.ObjectId(userId),
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$user",
    //       totalTimeInMili: {
    //         $sum: {
    //           $dateDiff: {
    //             startDate: "$startedAt",
    //             endDate: "$endedAt",
    //             unit: "millisecond",
    //           },
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "_id",
    //       foreignField: "_id",
    //       as: "user",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$user",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $project: {
    //       formatedTime: {
    //         $dateToString: {
    //           date: {
    //             $toDate: "$totalTimeInMili",
    //           },
    //           format: "%H:%M:%S",
    //         },
    //       },
    //       name: "$user.name",
    //     },
    //   },
    //   // {
    //   //   $project: {
    //   //     user: 1,
    //   //     totalHours: 1,
    //   //   },
    //   // },
    // ]);

    res.status(200).json(sessionsInfoByUser);
  } catch (error) {
    res.status(500).json({
      message: `Error in getting sessions info: ${error}`,
    });
  }
}
export async function update(req, res) {}
export async function destroy(req, res) {}
