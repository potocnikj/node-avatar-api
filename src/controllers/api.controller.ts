import { Router, Request, Response, NextFunction } from 'express';

export class ApiController {

    public readonly router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public index = (req: Request, res: Response, next: NextFunction) => {
        res.json({
            error: false,
            message: '',
            data: {
                application: 'AvatarGenerator',
                platform: 'Node.JS',
                version: '1.0.0 '
            }
        });
    };

    public health = (req: Request, res: Response, next: NextFunction) => {
        res.send('Healthy');
    };

    private init = () => {
        this.router.get('/', this.index);
        this.router.get('/health', this.health);
    };
}

export default (new ApiController()).router;