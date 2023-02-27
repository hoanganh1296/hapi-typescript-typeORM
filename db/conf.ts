import { PostsEntity } from "./entities/posts.entity";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { UsersEntity } from "./entities";
import { get } from "node-emoji";
import { blue } from "colors";
import { fakerUsers } from "./fakeDate";

const entities = [UsersEntity, PostsEntity];
const fakerFuncs = [fakerUsers];

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./hapi.db",
  entities,
  synchronize: true,
  logging: false,
});

export const AppDataConnection = async (): Promise<void> => {
  AppDataSource.initialize()
    .then(() => {
      console.log(get("dvd"), "DB init -> Done!", get("dvd"));
      entities.forEach((entity) => console.log(`Created ${entity.name}`.blue));
      console.log("Creating fake data......".yellow.bold);
      for (const func of fakerFuncs) func();
    })
    .catch((error) => console.log(error));
};
