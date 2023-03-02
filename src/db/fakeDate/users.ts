import { faker } from "@faker-js/faker";
import { Condition, Entity, Repository } from "typeorm";
import { AppDataSource } from "../conf";
import { UsersEntity, UserType } from "../entities";
import { get } from "node-emoji";
import { genSalt, hash } from "bcrypt";

export const fakerUsers = async (amount = 50) => {
  const userRepo: Repository<UsersEntity> =
    AppDataSource.getRepository(UsersEntity);
  for (const _ of Array.from({ length: amount })) {
    const { name, internet, date, helpers } = faker;
    const sex = faker.name.sexType();
    const firstName = name.firstName(sex);
    const lastName = name.lastName(sex);
    const birthOfDate = date.birthdate();
    const email = helpers.unique(internet.email, [firstName, lastName]);
    const type: UserType = helpers.arrayElement(["admin", "user"]);
    const salt = await genSalt();
    const password = await hash("secret", salt);
    const u: Partial<UsersEntity> = new UsersEntity(
      firstName,
      lastName,
      email,
      password,
      salt,
      birthOfDate,
      type
    );

    await userRepo.save(<Partial<UsersEntity>>u);
  }
  const emoji = get("white_check_mark");
  console.log(emoji, `Created ${amount} users`.magenta.bold, emoji);
};
