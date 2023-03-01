import * as Hapi from "@hapi/hapi";
import { Server, ResponseToolkit, Request } from "@hapi/hapi";
import { AppDataConnection } from "./db";
import "colors";
import { get } from "node-emoji";
import config from "config";

import routes from "./routes";

const init = async () => {
  const server: Server = Hapi.server({
    port: config.get<number>("SERVER_PORT"),
    host: config.get<string>("SERVER_HOST"),
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request: Request, h: ResponseToolkit, err?: Error) => {
      return { msg: "Hello World!" };
    },
  });

  await AppDataConnection();
  server.route(routes)
  await server.start().then();
  console.log(
    get("rocket"),
    `Server running on ${server.info.uri}`.green,
    get("rocket")
  );
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit();
});

init();
