import { UserRole } from "../entities/user.entity";

declare global {
  namespace Express {
    interface User {
      id: number;
      role: UserRole;
    }

    interface Request {
      user?: User;
    }
  }
}
