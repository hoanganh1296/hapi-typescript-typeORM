import { get } from "node-emoji";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { UsersEntity } from "./entities";
import { PostsEntity } from "./entities/posts.entity";
// import { fakePosts, fakerUsers } from "./fakeDate";

const entities = [UsersEntity, PostsEntity];
// const fakerFuncs = [fakerUsers,fakePosts];

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./hapi.db",
  entities,
  synchronize: true,
  logging: false,
});

export const AppDataConnection = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log(get("dvd"), "DB init -> Done!", get("dvd"));
    entities.forEach((entity) => console.log(`Created ${entity.name}`.blue));
    //Fake data
    // console.log("Creating fake data......".yellow.bold);
    // for (const func of fakerFuncs) await func();
  } catch (error) {
    console.log(error);
  }
};
