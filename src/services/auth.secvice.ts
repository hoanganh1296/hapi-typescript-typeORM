import Boom from "@hapi/boom";
import { genSalt, hash } from "bcrypt";
import { Repository, FindOneOptions } from "typeorm";

import { signJwt } from "../utils/jwt";
import { UsersEntity } from "../db/entities";
import { AppDataSource } from "../db";

const userRepo: Repository<UsersEntity> =
  AppDataSource.getRepository(UsersEntity);

export const registerUser = async (user: Partial<UsersEntity>) => {
  try {
    const { firstName, lastName, email, password, birthOfDate } = user;
    const currentUser = await userRepo.findOneBy({ email });
    if (currentUser) {
      throw Boom.badRequest("Email already registered");
    }

    const salt = await genSalt();
    const hashedPass = await hash(password, salt);
    const newUser: Partial<UsersEntity> = new UsersEntity(
      firstName,
      lastName,
      email,
      hashedPass,
      salt,
      birthOfDate
    );
    await userRepo.save<Partial<UsersEntity>>(newUser);
    delete newUser.password;
    delete newUser.salt;
    const accessToken = signJwt({ ...newUser });
    return { ...newUser, accessToken };
  } catch (error) {
    throw Boom.boomify(error);
  }
};

export const loginUser = async (user: Partial<UsersEntity>) => {
  try {
    const accessToken = signJwt({ ...user });
    return { ...user, accessToken };
  } catch (error) {
    throw Boom.boomify(error);
  }
};
