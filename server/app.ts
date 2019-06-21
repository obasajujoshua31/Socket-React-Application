import { createConnection } from 'typeorm';
import * as express from 'express'
import "reflect-metadata";
import * as logger from 'morgan'
import * as cors from 'cors'



class App {
    public app: express.Application;
    public port: number;

    constructor(routes: any[], port: number) {
        this.app = express()
        this.port = port
        this.app.use(cors())
        this.initializeDatabase()
        this.initializeMiddlewares()
        this.initializeRoutes(routes)

    }

    private initializeMiddlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(logger('dev'))
    }

    private initializeRoutes(routes) {
        routes.forEach(route => {
                this.app.use('/', route.router)
        });
    }

    private async initializeDatabase(){
            await createConnection()
    }
    public listen(){
        this.app.listen(this.port, (): void => {
            console.log('Server started at', this.port)
        })
    }

}

export default App;
