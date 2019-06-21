import * as bcrypt from "bcryptjs";
import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "config";
import httpInterface, { IDecodedToken } from "utils/http.interface";

class BaseController {
  private rounds: string = bcrypt.genSaltSync();

  public hashPassword = (password: string) => {
    return bcrypt.hashSync(password, this.rounds);
  };

  public matchPassword = (password: string, dbPassword: string) => {
    return bcrypt.compareSync(password, dbPassword);
  };

  public httpResponse(response: httpInterface) {
    return response.res.status(response.statusCode).json({
      success: response.statusCode < 300,
      message: response.message,
      data: response.data,
    });
  }
  public generateToken(user) {
    return jwt.sign({ id: user.user_id }, config.jwtSecret);
  }

  public serverError(res: Response, error: Error) {
    return res.status(500).json({
      success: true,
      message: "Server error",
      error: error.message,
    });
  }

  private verifyToken(token: string): any {
    return jwt.verify(token, config.jwtSecret);
  }

  public verifyUser() {
    return (req, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (typeof token !== "undefined") {
        try {
          const decoded = this.verifyToken(token);
          req.user = decoded.id;
          return next();
        } catch (error) {
          const response: httpInterface = {
            res,
            statusCode: 401,
            message: "User is not Authorized",
            data: null,
          };
          return this.httpResponse(response);
        }
      }
      const response: httpInterface = {
        res,
        statusCode: 401,
        message: "Token is not provided",
        data: null,
      };
      return this.httpResponse(response);
    };
  }
}

export default BaseController;
