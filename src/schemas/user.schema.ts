import { z } from "zod";
import { UserRole } from "../entities/user.entity";

export const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(UserRole).optional().default(UserRole.USER),
});

export const UserUpdateSchema = UserSchema.partial();
