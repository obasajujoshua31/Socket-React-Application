import User from "controllers/user/user.interface";
import { Request, Response } from "express";
import "reflect-metadata";
import UserService from "controllers/user/user.service";
import httpInterface from "utils/http.interface";
import BaseController from "utils/base";

const userService = new UserService();

export default class UserController extends BaseController {
  public getAllUsers = async (req: Request, res: Response) => {
    const users = await userService.findUsers();
    const response: httpInterface = {
      res,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    };
    return this.httpResponse(response);
  };

  public renderNotFoundPage = (req: Request, res: Response) => {
    const response: httpInterface = {
      res,
      statusCode: 404,
      message: "End point is not found",
      data: {},
    };
    return this.httpResponse(response);
  };

  public registerUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    let response: httpInterface;
    try {
      const foundUser = await userService.findUser(email);
      if (!foundUser.length) {
        const user: User = {
          email,
          password: this.hashPassword(password),
          name,
        };
        const newUser = await userService.saveUser(user);
        const token = this.generateToken(newUser);

        response = {
          res,
          statusCode: 201,
          message: "User signed up successfully",
          data: {
            token,
          },
        };
        return this.httpResponse(response);
      }

      response = {
        res,
        statusCode: 400,
        message: "Email is not available",
        data: {},
      };
      return this.httpResponse(response);
    } catch (error) {
      return this.serverError(res, error);
    }
  };

  public loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let response: httpInterface;
    const foundUser = await userService.findUser(email);
    if (foundUser.length) {
      if (this.matchPassword(password, foundUser[0].password)) {
        const token = this.generateToken(foundUser[0]);
        response = {
          res,
          statusCode: 200,
          message: "User signed in successfully",
          data: {
            token,
          },
        };
        return this.httpResponse(response);
      }
      response = {
        res,
        statusCode: 401,
        message: "Invalid login Credentials",
        data: {},
      };
      return this.httpResponse(response);
    }
    response = {
      res,
      statusCode: 401,
      message: "Invalid login Credentials",
      data: {},
    };
    return this.httpResponse(response);
  };
}
