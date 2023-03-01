import dotenv from "dotenv";
dotenv.config()
import {Server} from "@hapi/hapi"
import { get } from "node-emoji";
import initServer from "./server";
import { AppDataConnection } from "./db";

let server:Server;

async function bootstrap(){
  await AppDataConnection()
  server = await initServer()
  console.log(
    get("rocket"),
    `Server running on ${server.info.uri}`.green,
    get("rocket")
  );
  await server.start().then();
}

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit();
});

bootstrap()
