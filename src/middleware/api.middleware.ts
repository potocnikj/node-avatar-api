import {Request, Response, NextFunction} from 'express';

export class ApiMiddleware {
    public static handleError(err, req: Request, res: Response, next: NextFunction) {
        console.log(ApiMiddleware.reponseMessage("string"));
        switch (err.message) {
            case 'missing params':
                return res.status(400).json(ApiMiddleware.reponseMessage('Required gender and name in query params.'));
            case 'user not found':
                return res.status(404).json(ApiMiddleware.reponseMessage('No user found'));
            case 'id, name and gender required in body':
                return res.status(400).json(ApiMiddleware.reponseMessage('ID, name or gender not given in request'));
            default : {
                return res.status(500).json(ApiMiddleware.reponseMessage('Internal server error'));

            }
        }
    }

    public static notFound(req: Request, res: Response, next: NextFunction) {
        return res.status(404).json(
            {
                error: true,
                message: 'path not found ' + req.originalUrl,
                data: {}
            }
        );
    }

    private static reponseMessage(message: string){
        return {
            error: true,
            message: message,
            data: null
        }
    }
}