import BaseController from "utils/base";
import { Request, Response } from "express";
import ArticleService from "controllers/articles/article.service";
import { use } from "typescript-mix";
import { IArticle } from "controllers/articles/article.interface";
import httpInterface from "utils/http.interface";

interface ArticleController extends BaseController, ArticleService {}

class ArticleController {
  @use(BaseController, ArticleService) this;

  public saveArticle = async (req: any, res: Response) => {
    const article: IArticle = {
      content: req.body.content,
      description: req.body.description,
      author_id: req.user,
    };

    const newArticle = await this.createArticle(article);
    const response: httpInterface = {
      res,
      message: "Article created successfully",
      statusCode: 201,
      data: {
        article: newArticle,
      },
    };
    return this.httpResponse(response);
  };

  public authenticateUser = () => {
    return this.verifyUser();
  };

  public getAllArticles = async (req: Request, res: Response) => {
    const allArticles = await this.findArticles();
    const response: httpInterface = {
      res,
      message: "Articles retrieved successfully",
      statusCode: 200,
      data: {
        articles: allArticles,
      },
    };

    return this.httpResponse(response);
  };
}

export default ArticleController;
