import Joi from "joi";
import {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/users.controller";
import { createUserData, updateUserData } from "../utils/validation";

export const userRouter = [
  {
    method: "GET",
    path: "/users",
    handler: getUsers,
    options: {
      description: "Get Users",
      tags: ["api"],
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responses: {
            200: { description: "Success" },
            404: { description: "Not Found" },
          },
        },
      },
    },
  },
  {
    method: "GET",
    path: "/users/{id}",
    handler: getUser,
    options: {
      validate: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      description: "Get one user by user id",
      tags: ["api"],
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responses: {
            200: { description: "Success" },
            404: { description: "Not Found" },
          },
        },
      },
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: createUser,
    options: {
      validate: {
        payload: createUserData,
      },
      description: "create a new user",
      tags: ["api"],
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responses: {
            200: { description: "Success" },
            404: { description: "Not Found" },
          },
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: updateUser,
    options: {
      validate: {
        payload: updateUserData,
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      description: "Update a user by id",
      tags: ["api"],
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responses: {
            200: { description: "Success" },
            404: { description: "Not Found" },
          },
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    handler: deleteUser,
    options: {
      validate: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      description: "Delete one user by id",
      tags: ["api"],
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responses: {
            200: { description: "Success" },
            404: { description: "Not Found" },
          },
        },
      },
    },
  },
];
