import Boom from "@hapi/boom";
import { FindOperator, FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../db";
import { UsersEntity } from "../db/entities";
// import {ResponseObject} from "hapi"

const userRepo: Repository<UsersEntity> =
  AppDataSource.getRepository(UsersEntity);

export const getUsers = async () => {
  const users = await userRepo.find();
  return {
    users: users.map((u: UsersEntity) => {
      delete u.salt;
      delete u.password;
      return u;
    }),
  };
};

export const getUser = async (id: number) => {
  const currentUser: UsersEntity = await userRepo.findOneBy({ id });
  if (!currentUser) throw Boom.badRequest("User not found");
  return currentUser;
};

export const createUser = async (user: UsersEntity) => {
  const newUser = await userRepo.save(user);
  return newUser;
};

export const updateUser = async (id: number, user: UsersEntity) => {
  try {
    const currentUser = await userRepo.findOneBy({ id });
    if (!currentUser) {
      throw Boom.badRequest("User not found");
    }
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;
    currentUser.birthOfDate = user.birthOfDate;
    currentUser.type = user.type;
    await userRepo.save(currentUser);
    return currentUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (id: number) => {
  const currentUser: UsersEntity = await userRepo.findOneBy({ id });
  if (!currentUser) throw Boom.badRequest("User not found");
  await userRepo.delete(id);
  return true;
};
