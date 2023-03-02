import { ResponseToolkit, ResponseObject, Request } from "@hapi/hapi";
import { UsersEntity } from "../db/entities";
import * as authService from "../services/auth.secvice";

export const register = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    
    const user = request.payload as Partial<UsersEntity>;
    const result = await authService.registerUser(user);
    return h.response({ message: "success", result }).code(201);
  } catch (error) {
    return error;
  }
};

export const login = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const user = request.auth.credentials as Partial<UsersEntity>;
    const result = await authService.loginUser(user);
    return h.response({ message: "success", result }).code(201);
  } catch (error) {
    return error;
  }
};


