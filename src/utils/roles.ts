import { UserRole } from "../entities/user.entity";

// TODO: make sure it's right like in the pdf
export const permissions = {
  [UserRole.USER]: {
    canViewOwnDetails: true,
    canUpdateOwnDetails: true,
    canGetUsers: false,
    canUpdateOtherUsers: false,
    canDeleteUsers: false,
  },
  [UserRole.ADMIN]: {
    canViewOwnDetails: true,
    canUpdateOwnDetails: true,
    canGetUsers: true,
    canUpdateOtherUsers: true,
    canDeleteUsers: true,
  },
};
