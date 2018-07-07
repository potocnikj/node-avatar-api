import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import AvatarController from './controllers/avatar.controller';
import ApiController from './controllers/api.controller';
import {ApiMiddleware} from './middleware/api.middleware';

// Creates and configures an ExpressJS web server.
class App {
    // ref to Express instance
    public readonly express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/', ApiController);
        this.express.use('/v1/avatar', AvatarController);

        this.express.use(ApiMiddleware.handleError);
        this.express.use(ApiMiddleware.notFound);
    }
}

export default new App().express;