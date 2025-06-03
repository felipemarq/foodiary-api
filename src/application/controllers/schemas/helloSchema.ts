import { z } from "zod";

export const helloSchema = z.object({
  name: z
    .string({
      message: "Name should be a string",
    })
    .min(2, "Name is too short"),
  email: z.string().min(5, "Email is too short").email("Invalid email"),
});

export type HelloBody = z.infer<typeof helloSchema>;
