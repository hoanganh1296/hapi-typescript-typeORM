import { Repository } from "typeorm";
import { UsersEntity } from "../db/entities/users.entity";
import { AppDataConnection, AppDataSource } from "../db";
import { ResponseToolkit, ServerRoute, Request } from "hapi";
import * as userService from "../services/users.service";

export const getUsers = async (request: Request, h: ResponseToolkit) => {
  try {
    const result = await userService.getUsers();
    return h.response(result).code(200);
  } catch (error) {
    return error;
  }
};

export const getUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const result = await userService.getUser(request.params.id);
    return h.response(result).code(200);
  } catch (error) {
    return error;
  }
};

export const createUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const result = await userService.createUser(request.payload as UsersEntity);
    return h.response(result).code(201);
  } catch (error) {
    return error;
  }
};

export const updateUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const id = request.params.id;
    const user = request.payload as UsersEntity;
    const result = await userService.updateUser(id, user);
    return h.response(result).code(201);
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const id = request.params.id;
    await userService.deleteUser(id);
    return h.response("Delete user success!").code(200);
  } catch (error) {
    return error;
  }
};
