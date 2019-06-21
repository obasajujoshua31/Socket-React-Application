import UserRoutes from "routes/user";
import ArticleRoutes from "routes/article";
const userRoutes = new UserRoutes();
const articleRoutes = new ArticleRoutes();

const routes: any[] = [userRoutes, articleRoutes];

export default routes;
