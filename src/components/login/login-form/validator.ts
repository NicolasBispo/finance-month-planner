import { z } from "zod";

export const loginValidatorSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginSchema = z.infer<typeof loginValidatorSchema>;
