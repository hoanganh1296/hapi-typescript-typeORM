import { PostsEntity } from "./entities/posts.entity";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { UsersEntity } from "./entities";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./hapi.db",
  entities: [UsersEntity, PostsEntity],
  synchronize: true,
  logging: false,
});
