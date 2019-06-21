import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import * as uuid from "uuid/v4";
import { Game } from "controllers/games/games.entity";
import { Article } from "controllers/articles/article.entity";

@Entity("users")
export class Users {
  @PrimaryColumn("uuid")
  user_id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  imageURL: string;

  @Column({ nullable: true })
  interest: string;

  @BeforeInsert()
  addUser_id() {
    this.user_id = uuid();
  }

  @ManyToMany(type => Game, game => game.users)
  @JoinTable({
    name: "users_games",
    joinColumn: {
      name: "users",
      referencedColumnName: "user_id",
    },
    inverseJoinColumn: {
      name: "games",
      referencedColumnName: "game_id",
    },
  })
  games: Game[];
  @OneToMany(() => Article, article => article.author)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "author_id",
  })
  articles: Article[];
}
