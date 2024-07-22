import { JwtPayload, verify } from "jsonwebtoken";
import methodHandle from "./method";
import accessControl from "./accessControl";
import userControl from "./user";

export const errorHandle = (
  token: string,
  res: any,
  req: any,
  method: string
) => {
  accessControl(token, res);
  const userId = userControl(token, res);
  methodHandle(req, res, method);
  return userId;
};
