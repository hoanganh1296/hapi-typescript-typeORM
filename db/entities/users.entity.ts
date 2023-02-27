import { PostsEntity } from "./posts.entity";
import { SharedProp } from "./sharedProp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export type UserType = "admin" | "user";

@Entity({ name: "users" })
export class UsersEntity extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", nullable: false })
  firstName: string;

  @Column({ name: "last_name", nullable: false })
  lastName: string;

  @Column({ name: "birth_of_date", nullable: true, type: "date" })
  birthDate: Date;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ default: "user" })
  type: UserType;

  @OneToMany(() => PostsEntity, (post: PostsEntity) => post.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  posts: Array<PostsEntity>;
}
