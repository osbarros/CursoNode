import { z } from "zod";

export const login = z.object({
  body: z.object({
    email: z
      .string({ required_error: "E-mail is required" })
      .email("Invalida e-mail"),
    password: z.string({ required_error: "Password is required" }),
  }),
});
