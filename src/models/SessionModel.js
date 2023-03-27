import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startedAt: {
      type: Date,
      default: Date.now(),
    },
    endedAt: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false }
);

const SessionModel = mongoose.model("Session", SessionSchema);
export default SessionModel;