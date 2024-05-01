import { z } from "zod";
import { Gender } from "./types";

export const registerFormSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string(),

  gender: z.nativeEnum(Gender),
  birthdate: z.date(),

  address: z.object({
    street: z.string(),
    barangay: z.string(),
    municipality: z.string(),
    province: z.string(),
    country: z.string(),
    zipcode: z.number().int(),
  }),
});

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const sellProductFormSchema = z.object({
  productName: z.string().min(2).max(20),
  description: z.string().min(5).max(500),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative().int()
}); 
