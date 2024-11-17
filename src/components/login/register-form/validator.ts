import { z } from "zod";

export const signupValidatorSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type SignupSchema = z.infer<typeof signupValidatorSchema>;
