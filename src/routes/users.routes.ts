import { getUsers } from "../controllers/users.controller";
import { createUser } from "../utils/validation";

export const userRouter = [
  {
    method: "GET",
    path: "/users",
    handler: getUsers,
    options: {
      description: "Get Events",
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



