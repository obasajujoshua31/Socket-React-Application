import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import * as uuid from "uuid/v4";
import { Users } from "controllers/user/UserModel.entity";

@Entity("articles")
export class Article {
  @PrimaryColumn("uuid")
  article_id: string;

  @Column()
  content: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  numberOfLikes: number;

  @Column()
  author_id: string;

  @Column({ default: 0 })
  numberOfComments: number;

  @Column({default: new Date().toString()})
    date: string

  @BeforeInsert()
  addArticleId() {
    this.article_id = uuid();
  }

  @ManyToOne(type => Users, user => user.articles)
  @JoinColumn({
    name: "author_id",
    referencedColumnName: "user_id",
  })
  author: Users;
}
