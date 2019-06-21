import "module-alias/register";
import App from "app";
import routes from "routes";

const app = new App(routes, 2001);

app.listen();
