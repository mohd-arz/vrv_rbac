import z from "zod";

export const userLogin = z.object({
  username: z.string(),
  password: z.string().min(8, "Password must contains 8 characters"),
});

export const userRegister = z
  .object({
    name: z.string(),
    username: z.string(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
    role_id: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export type userLoginType = z.infer<typeof userLogin>;
export type userRegisterType = z.infer<typeof userRegister>;
