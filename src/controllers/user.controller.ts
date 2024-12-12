import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpStatusCodes } from "../utils/http-status-codes";
import ForbiddenError from "../exceptions/forbidden-exception";
import NotFoundError from "../exceptions/not-found-exception";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const user = await this.userService.create(req.body);
      return res.status(HttpStatusCodes.CREATED).json(user);
    } catch (error: any) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const users = await this.userService.findAll(req.user);
      return res.status(HttpStatusCodes.OK).json(users);
    } catch (error: any) {
      if (error instanceof ForbiddenError) {
        return res
          .status(HttpStatusCodes.FORBIDDEN)
          .json({ message: error.message });
      } else {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    try {
      const user = await this.userService.findById(
        req.user,
        parseInt(req.params.id)
      );

      return res.status(HttpStatusCodes.OK).json(user);
    } catch (error: any) {
      if (error instanceof ForbiddenError) {
        return res
          .status(HttpStatusCodes.FORBIDDEN)
          .json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: error.message });
      } else {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      await this.userService.update(
        parseInt(req.params.id),
        req.user,
        req.body
      );
      return res.status(HttpStatusCodes.NO_CONTENT).send();
    } catch (error: any) {
      if (error instanceof ForbiddenError) {
        return res
          .status(HttpStatusCodes.FORBIDDEN)
          .json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: error.message });
      } else {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
    }
  }

  async deleteById(req: Request, res: Response): Promise<any> {
    try {
      await this.userService.deleteById(parseInt(req.params.id), req.user);
      return res.status(HttpStatusCodes.NO_CONTENT).send();
    } catch (error: any) {
      if (error instanceof ForbiddenError) {
        return res
          .status(HttpStatusCodes.FORBIDDEN)
          .json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: error.message });
      } else {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
    }
  }
}
