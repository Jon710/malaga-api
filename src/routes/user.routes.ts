import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { validate } from "../middlewares/validation.middleware";
import { UserUpdateSchema } from "../schemas/user.schema";
import { authorize } from "../middlewares/authorization.middleware";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// router.get("/:id", authorize("canViewOwnDetails"), (req, res) =>
//   userController.findById(req, res)
// );
// router.get("/", authorize("canGetUsers"), (req, res) =>
//   userController.findAll(req, res)
// );
// router.put(
//   "/:id",
//   authorize("canUpdateOwnDetails"),
//   validate(UserUpdateSchema),
//   (req, res) => userController.update(req, res)
// );
// router.delete("/:id", authorize("canDeleteUsers"), (req, res) =>
//   userController.deleteById(req, res)
// );

router.get("/:id", (req, res) => userController.findById(req, res));
router.get("/", (req, res) => userController.findAll(req, res));
router.put("/:id", validate(UserUpdateSchema), (req, res) =>
  userController.update(req, res)
);
router.delete("/:id", (req, res) => userController.deleteById(req, res));

export default router;
