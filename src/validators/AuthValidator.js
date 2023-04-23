import { z } from "zod";
import validate from "./validate.js";

export const login = validate(
  z.object({
    body: z.object({
      email: z
        .string({ required_error: "E-mail is required" })
        .email("Invalida e-mail"),
      password: z.string({ required_error: "Password is required" }),
    }),
  })
);
