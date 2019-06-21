import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from "typeorm";
import * as uuid from "uuid/v4";
import { Users } from "controllers/user/UserModel.entity";

@Entity("games")
export class Game {
  @PrimaryColumn("uuid")
  game_id: string;

  @Column()
  name: string;

  @BeforeInsert()
  addGameId() {
    this.game_id = uuid();
  }

  @ManyToMany(type => Users, user => user.games)
  @JoinTable({
    name: "users_games",
    joinColumn: {
      name: "games",
      referencedColumnName: "game_id",
    },
    inverseJoinColumn: {
      name: "users",
      referencedColumnName: "user_id",
    },
  })
  users: Users[];
}
