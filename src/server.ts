import * as Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import "colors";
import config from "config";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import HapiSwagger = require("hapi-swagger");
import basic = require("@hapi/basic");
import Jwt = require("hapi-auth-jwt2");

import routes from "./routes";
import { swaggerOptions } from "./swagger/swagger.info";
import { validateBasic, validateJWT } from "./utils/auth.helper";

const initServer = async (): Promise<Server> => {
  const server: Server = Hapi.server({
    port: config.get<number>("SERVER_PORT"),
    host: config.get<string>("SERVER_HOST"),
  });

  await server.register(basic);
  await server.register(Jwt);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.auth.strategy("simple", "basic", { validate: validateBasic() });
  server.auth.strategy("jwt", "jwt",{
    key: Buffer.from(config.get<string>("privateKey"), "base64").toString(
      "ascii"
    ),
    validate: validateJWT(), // validate function defined above
  });
  server.auth.default("jwt")
  console.log(routes)
  server.route(routes);
  return server;
};

export default initServer;
