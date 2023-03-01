import * as Hapi from "@hapi/hapi";
import { Server, ResponseToolkit, Request } from "@hapi/hapi";
import { AppDataConnection } from "./db";
import "colors";
import { get } from "node-emoji";
import config from "config";

import routes from "./routes";

const initServer = async ():Promise<Server> => {
  const server: Server = Hapi.server({
    port: config.get<number>("SERVER_PORT"),
    host: config.get<string>("SERVER_HOST"),
  });

  server.route(routes)
  return server
};


export default initServer
