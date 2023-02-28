import { FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../db";
import { UsersEntity } from "../db/entities";
import { Request } from "hapi";
import Boom  from "boom";
// import {ResponseObject} from "hapi"

const userRepo: Repository<UsersEntity> =
  AppDataSource.getRepository(UsersEntity);

export const getUsers = async () => {
  const users = await userRepo.find();
  return users;
};

export const getUser = async (id) => {
  const currentUser: UsersEntity = await userRepo.findOneBy({ id });
  if(!currentUser) throw Boom.badRequest('User not found'); 
  return currentUser;
};

export const createUser = async (user: UsersEntity) => {
  const newUser = await userRepo.save(user);
  return newUser;
};

export const updateUser = async (id,user: UsersEntity) => {
  const currentUser:UsersEntity = await userRepo.save({ id,...user});
  if(!currentUser) throw Boom.badRequest('User not found'); 
  return currentUser;
};

export const deleteUser = async (id) => {
  const currentUser: UsersEntity = await userRepo.findOneBy({ id });
  if(!currentUser) throw Boom.badRequest('User not found'); 
  await userRepo.delete(id);
  return true;
};
