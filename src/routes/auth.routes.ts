import { login, register } from "../controllers/auth.controller";
import { loginUserData, registerUserData } from "../utils/validation";

export const authRouter = [
  {
    method: "POST",
    path: "/auth/register",
    handler: register,
    options: {
      validate: {
        payload: registerUserData,
      },  
      // auth:false,
      description: "Register a new user",
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
    path: "/auth/login",
    handler: login,
    options: {
      validate: {
        payload: loginUserData,
      },
      auth:{
        strategy:"simple"
      },
      description: "Login a new user",
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
