import { HttpStatusCodes } from "../utils/http-status-codes";
import HttpException from "./http-exception";

class UserAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(
      HttpStatusCodes.BAD_REQUEST,
      `User with email ${email} already exists`
    );
  }
}

export default UserAlreadyExistsException;
