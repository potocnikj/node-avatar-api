import { Router, Request, Response, NextFunction } from 'express';
import { AvatarService } from '../services/avatar.service';
import { Inject } from "typescript-ioc";

export class AvatarController {

    router: Router;

    @Inject
    private readonly avatarService: AvatarService;

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAvatarJson = (req: Request, res: Response, next: NextFunction) => {
        res.json({
            error: false,
            message: '',
            data: this.avatarService.generateAvatar(req.query.gender, req.query.name, next)
        });
    };

    public getAvatar = (req: Request, res: Response, next: NextFunction) => {
        res.send(this.avatarService.generateAvatar(req.query.gender, req.query.name, next));
    };

    public createAvatar = (req: Request, res: Response, next: NextFunction) => {
        this.avatarService.generateAvatarPost(req.body.gender, req.body.name, req.body.id, next, (avatar) => {
            res.status(200).json({
                error: false,
                message: 'files generated',
                data: null
            });
        });
    };

    private init = () => {
        this.router.get('/json', this.getAvatarJson);
        this.router.get('/', this.getAvatar);
        this.router.post('/', this.createAvatar);
    };
}

export default (new AvatarController()).router;