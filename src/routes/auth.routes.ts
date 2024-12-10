import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { validate } from "../middlewares/validation.middleware";
import { UserSchema } from "../schemas/user.schema";
import { LoginSchema } from "../schemas/auth.schema";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository, userService);
const authController = new AuthController(authService);

router.post("/login", validate(LoginSchema), (req, res) =>
  authController.login(req, res)
);
router.post("/register", validate(UserSchema), (req, res) =>
  authController.register(req, res)
);

export default router;
