import { Router } from "express";
import "module-alias/register";
import UserController from "controllers/user/user.controller";

const userController = new UserController();

class UserRoutes {
  public home: string = "/users";
  public register: string = "/register";
  public login: string = "/login";
  public router: Router = Router();

  constructor() {
    this.initializeControllers();
  }

  public initializeControllers() {
    this.router.get(this.home, userController.getAllUsers);
    this.router.post(this.register, userController.registerUser);
    this.router.post(this.login, userController.loginUser);
    // this.router.all("*", userController.renderNotFoundPage);
    // this.router.post(this.register, userController.registerUser)
  }
}

export default UserRoutes;
