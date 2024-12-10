import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { validate } from "../middlewares/validation.middleware";
import { UserSchema } from "../schemas/user.schema";
import { LoginSchema } from "../schemas/auth.schema";

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/login", validate(LoginSchema), (req, res) =>
  authController.login(req, res)
);
router.post("/register", validate(UserSchema), (req, res) =>
  authController.register(req, res)
);

export default router;
