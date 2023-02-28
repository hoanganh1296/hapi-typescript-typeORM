import Joi from "joi";
import { UsersEntity } from "../db/entities";

export const createUser = Joi.object<UsersEntity>({
  firstName: Joi.string().required().max(15),
  lastName: Joi.string().required().max(15),
  email: Joi.string().email().required(),
  birthOfDate: Joi.date(),
  type: Joi.string().required(),
});
