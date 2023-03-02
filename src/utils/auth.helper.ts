import { Request, ResponseToolkit } from "@hapi/hapi";
import { Repository } from "typeorm";
import { UsersEntity } from "../db/entities/users.entity";
import { compare, hash, genSalt } from "bcrypt";
import { AppDataSource } from "../db";

const userRepo: Repository<UsersEntity> =
  AppDataSource.getRepository(UsersEntity);

export const validateJWT = () => {
  return async (
    { id }: Partial<UsersEntity>,
    request: Request,
    h: ResponseToolkit
  ) => {
    const user: UsersEntity = await userRepo.findOneBy({id});
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: { user } };
  };
};

export const validateBasic = () => {
  return async (
    request: Request,
    username: string,
    password: string,
    h: ResponseToolkit
  ) => {
    const user: UsersEntity = await userRepo.findOneBy({ email:username });
    if (!user) {
      return { credentials: null, isValid: false };
    }
    const isValid = (await hash(password, user.salt)) === user.password;
    delete user.password;
    delete user.salt;
    // credentials - a credentials object passed back to the application in `request.auth.credentials`.
    return { isValid: isValid, credentials: user };
  };
};
