import Joi from "joi";
import { UsersEntity } from "../db/entities";

export const createUserData = Joi.object<UsersEntity>({
  firstName: Joi.string().required().max(15).example("John"),
  lastName: Joi.string().required().max(15).example("Smith"),
  email: Joi.string().email().required().example("example@gmail.com"),
  birthOfDate: Joi.date().example("2000-01-01"),
  type: Joi.string().required().example("user || admin"),
}).label("createUserSchema")

export const updateUserData = Joi.object<UsersEntity>({
  id: Joi.string().required().example("10"),
  firstName: Joi.string().required().max(15).example("John"),
  lastName: Joi.string().required().max(15).example("Smith"),
  email: Joi.string().email().required().example("example@gmail.com"),
  birthOfDate: Joi.date().example("2000-01-01"),
  type: Joi.string().required().example("user || admin"),
}).label("createUserSchema")
