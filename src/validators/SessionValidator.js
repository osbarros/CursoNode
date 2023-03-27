import { z } from "zod";
import validate from "./validate.js";

export const getById = validate(
  z.object({
    params: z.object({
      id: z.string({ required_error: "Session id is required" }),
    }),
  })
);

export const getByUserId = validate(
  z.object({
    params: z.object({
      userId: z.string({ required_error: "Session user id is required" }),
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
    params: z.object({
      userId: z.string({ required_error: "Session user id is required" }),
    }),
  })
);
