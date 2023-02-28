import { faker } from "@faker-js/faker";
import { Repository } from "typeorm";
import { AppDataSource } from "../conf";
import { UsersEntity, UserType } from "../entities";
import { get } from "node-emoji";
import { PostsEntity } from "../entities/posts.entity";

export const fakePosts = async (amount = 50) => {
  const { name, lorem, helpers } = faker;
  const postRepo: Repository<PostsEntity> =
    AppDataSource.getRepository(PostsEntity);
  const userRepo: Repository<UsersEntity> =
    AppDataSource.getRepository(UsersEntity);
  const users: Array<UsersEntity> = await userRepo.find();
  for (const user of users) {
    const shouldWeCreate: boolean = helpers.arrayElement([false, true]);
    if (shouldWeCreate) {
      const title = name.jobTitle();
      const body = lorem.paragraphs();
      const title2 = name.jobTitle();
      const body2 = lorem.paragraphs();
      const p: Partial<PostsEntity> = new PostsEntity(title, body, user);
      const p2: Partial<PostsEntity> = new PostsEntity(title2, body2, user);
      await postRepo.save<Partial<PostsEntity>>(p);
      await postRepo.save<Partial<PostsEntity>>(p2);
    }
  }
  const emoji = get("white_check_mark");
  console.log(emoji, `Created ${amount} posts`.magenta.bold, emoji);
};
