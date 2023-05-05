import { z } from "zod";

export const getActive = z.object({
  query: z
    .object({
      timezone: z.string({ required_error: "Session id is required" }),
    })
    .optional(),
});

export const create = z.object({
  body: z.object({
    userId: z.string({ required_error: "Session user id is required" }),
  }),
});

export const endSession = z.object({
  body: z.object({
    userId: z.string({ required_error: "Session user id is required" }),
  }),
});
