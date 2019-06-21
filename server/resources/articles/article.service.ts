import { getRepository, Repository } from "typeorm";
import { IArticle } from "controllers/articles/article.interface";
import { Article } from "controllers/articles/article.entity";

class ArticleService {
  constructor() {
    this.findArticles = this.findArticles.bind(this);
    this.findArticleById = this.findArticleById.bind(this);
    this.createArticle = this.createArticle.bind(this);
  }

  private async getArticleRepo() {
    try {
      const articleRepo: Repository<Article> = await getRepository(Article);
      return articleRepo;
    } catch (error) {
      throw error;
    }
  }
  public async findArticles() {
    try {
      const articleRepo = await this.getArticleRepo();
      const articles = await articleRepo.find({
        relations: ["author"],
      });
      return articles;
    } catch (error) {
      throw error;
    }
  }

  public async findArticleById(article_id: string) {
    try {
      const articleRepo = await this.getArticleRepo();
      return await articleRepo.find({
        where: {
          article_id,
        },
        relations: ["author"],
      });
    } catch (error) {
      throw error;
    }
  }

  public async findUsersArticle(author_id: string) {
    try {
      const articleRepo = await this.getArticleRepo();
      return await articleRepo.find({ author_id });
    } catch (error) {
      throw error;
    }
  }

  public async createArticle(article: IArticle) {
    try {
      const articleRepo = await this.getArticleRepo();
      const newArticle = await articleRepo.create(article);
      await articleRepo.save(newArticle);
      return newArticle;
    } catch (error) {
      throw error;
    }
  }
}
export default ArticleService;
