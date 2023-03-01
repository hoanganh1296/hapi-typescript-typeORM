import { Request, ResponseObject, ResponseToolkit } from "hapi";
import { UsersEntity } from "../db/entities/users.entity";
import * as userService from "../services/users.service";

export const getUsers = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const result = await userService.getUsers();
    return h.response(result).code(200);
  } catch (error) {
    return error;
  }
};

export const getUser = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const result = await userService.getUser(request.params.id as unknown as number);
    return h.response(result).code(200);
  } catch (error) {
    return error;
  }
};

export const createUser = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const result = await userService.createUser(request.payload as UsersEntity);
    return h.response({message:"success",result}).code(201);
  } catch (error) {
    return error;
  }
};

export const updateUser = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const id = request.params.id as unknown as number;
    const user = request.payload as UsersEntity;
    const result = await userService.updateUser(id, user);
    return h.response(result).code(201);
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    await userService.deleteUser(request.params.id as unknown as number);
    return h.response({message:"Delete user success!"}).code(200);
  } catch (error) {
    return error;
  }
};
