import { HttpStatusCodes } from "../utils/http-status-codes";
import HttpException from "./http-exception";

class NotFoundError extends HttpException {
  constructor() {
    super(HttpStatusCodes.NOT_FOUND, "Not found");
  }
}

export default NotFoundError;
