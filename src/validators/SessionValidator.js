import { z } from "zod";
import validate from "./validate.js";

export const getActive = validate(
  z.object({
    params: z.object({
      timezone: z.string({ required_error: "Session id is required" }),
    }),
  })
);

export const create = validate(
  z.object({
    body: z.object({
      userId: z.string({ required_error: "Session user id is required" }),
    }),
  })
);

export const endSession = validate(
  z.object({
    body: z.object({
      userId: z.string({ required_error: "Session user id is required" }),
    }),
  })
);
