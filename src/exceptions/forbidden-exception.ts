import { HttpStatusCodes } from "../utils/http-status-codes";
import HttpException from "./http-exception";

class ForbiddenError extends HttpException {
  constructor() {
    super(HttpStatusCodes.FORBIDDEN, "Forbidden");
  }
}

export default ForbiddenError;
