import { z } from "zod";

export const getById = z.object({
  params: z.object({
    id: z.string({ required_error: "User id is required" }),
  }),
});

export const create = z.object({
  body: z
    .object({
      name: z.string(),
      role: z.enum(["Dev", "Consultor", "Gerente"], {
        errorMap: () => ({ message: "Role not allowed" }),
      }),
      status: z.string().default(""),
      email: z
        .string({ required_error: "E-mail is required" })
        .email("Invalida e-mail"),
      password: z.string({ required_error: "Password is required" }),
      confirmPassword: z.string({
        required_error: "Confirm password is required",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }),
});

export const update = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z
      .enum(["Dev", "Consultor", "Gerente"], {
        errorMap: () => ({ message: "Role not allowed" }),
      })
      .optional(),
    status: z.string().default("").optional(),
  }),
  params: z.object({
    id: z.string({ required_error: "User id is required" }),
  }),
});

export const destroy = z.object({
  params: z.object({
    id: z.string({ required_error: "User id is required" }),
  }),
});
