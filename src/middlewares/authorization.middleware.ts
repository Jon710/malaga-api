import { Request, Response, NextFunction } from "express";
import { permissions } from "../utils/roles";
import { UserRole } from "../entities/user.entity";

// export const authorize = (action: keyof (typeof permissions)[UserRole]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const userRole = req.user?.role as UserRole;

//     if (permissions[userRole][action]) {
//       next();
//     } else {
//       res.status(403).json({ message: "Forbidden" });
//     }
//   };
// };

// Middleware to enforce role-based access
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Assuming user is added to req via JWT middleware

    console.log("User", user);

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        errors: [
          {
            title: "Forbidden",
            detail: "You do not have permission to perform this action.",
          },
        ],
      });
    }

    next();
  };
};
