import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { validate } from "../middlewares/validation.middleware";
import { UserUpdateSchema } from "../schemas/user.schema";
import { UserRepository } from "../repositories/user.repository";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/:id", (req, res) => userController.findById(req, res));
router.get("/", (req, res) => userController.findAll(req, res));
router.put("/:id", validate(UserUpdateSchema), (req, res) =>
  userController.update(req, res)
);
router.delete("/:id", (req, res) => userController.deleteById(req, res));

export default router;
