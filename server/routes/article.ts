import ArticleController from "../resources/articles/article.controller";
import { Router } from "express";

const articleController = new ArticleController();

class ArticleRoutes {
  public home: string = "/articles";
  public articles: string = "/articles";
  public router: Router = Router();

  constructor() {
    this.initializeControllers();
  }

  public initializeControllers() {
    this.router.post(
      this.home,
      articleController.authenticateUser(),
      articleController.saveArticle
    );

    this.router.get(this.articles, articleController.getAllArticles);

    // this.router.post(this.register, userController.registerUser)
  }
}

export default ArticleRoutes;
