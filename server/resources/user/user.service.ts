import { getRepository, Repository } from "typeorm";
import UserInterface from "controllers/user/user.interface";
import { Users } from "controllers/user/UserModel.entity";

class UserService {
  constructor() {
    this.findUsers = this.findUsers.bind(this);
    this.findUser = this.findUser.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  private async getUserRepo() {
    try {
      const userRepo: Repository<Users> = await getRepository(Users);
      return userRepo;
    } catch (error) {
      throw error;
    }
  }
  public async findUsers() {
    try {
      const userRepo = await this.getUserRepo();
      const users = await userRepo.find({
        relations: ["games", "articles"],
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async findUser(email: string) {
    try {
      const userRepo = await this.getUserRepo();
      return await userRepo.find({ email });
    } catch (error) {
      throw error;
    }
  }

  public async saveUser(user: UserInterface) {
    try {
      const userRepo = await this.getUserRepo();
      const newUser = await userRepo.create(user);
      await userRepo.save(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
