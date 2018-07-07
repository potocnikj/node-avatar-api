import Avatars from '@dicebear/avatars';
import SpriteCollectionMale from '@dicebear/avatars-male-sprites';
import SpriteCollectionFemale from '@dicebear/avatars-female-sprites';
import SpriteCollectionID from '@dicebear/avatars-identicon-sprites';
import { NextFunction } from 'express';
import * as svg2png from 'svg2png';
import * as fs from 'fs';
import { environment } from '../environment/environment';
import * as request from 'request'

import { VisitorRepository } from '../repositories/visitor.repository';
import { Inject } from 'typescript-ioc';
import {writeFile} from "fs";

export class AvatarService {

    @Inject
    private readonly visitorRepository: VisitorRepository;

    public generateAvatar = (gender: string, name: string, next: NextFunction) => {
        if (!gender || !name) {
            return next(new Error('missing params'));
        }

        return this.createAvatar(gender, name);
    };

    public generateAvatarPost = (gender: string, name: string, id: number, next: NextFunction, cb)  => {
        if (!(gender && name && id)) {
            return next(new Error('id, name and gender required in body'));
        }
        this.visitorRepository.exists(id, next, (rs) => {
            if (rs === 0) {
                return next(new Error('user not found'));
            }
            const fileName = String((new Date().getTime())) + '_' + String(id);
            this.writeToFile(fileName, name, gender, next, (rs123)=>{
                if(rs123 === false){
                    request.post(
                        {
                            url: environment.userAPIURL + '/v1/avatar',
                            formData: {
                                file: fs.createReadStream('./src/public/png/' + fileName + '.png')
                            }
                        }, (err, httpResponse, body) => {
                            if (err) {
                                return console.error('upload failed:', err);
                            }
                            this.visitorRepository.update(fileName + '.png', id, next, (rs) => {
                                fs.unlinkSync('./src/public/png/' + fileName + '.png');
                                fs.unlinkSync('./src/public/svg/' + fileName + '.svg');
                                if(rs) cb('jej ?? not sure that this is ?');
                            });
                        });
                }
                else{
                    return next(rs123);
                }
            })

        });
    };


    private writeToFile = (fileName: string, name: string, gender:string ,next:NextFunction, cb)=>{

        fs.writeFile('./src/public/svg/' + fileName + '.svg', this.createAvatar(gender, name), (err) => {
            if (err) {
                return next(err);
            }
            fs.readFile('./src/public/svg/' + fileName + '.svg', (err, data) => {
                if (err) {
                    return next(err);
                }
                svg2png(data, {width: 300, height: 400})
                    .then(buffer => fs.writeFile('./src/public/png/' + fileName + '.png', buffer, (err) => {
                        if (err) {
                            return next(err);
                        }
                        cb(false);

                    }))
                    .catch(e => cb(e));
            });
        });

    };


    private createAvatar = (gender: string, name: string) => {
        switch (gender) {
            case 'M': {
                return new Avatars(SpriteCollectionMale).create(name);
            }
            case 'F': {
                return new Avatars(SpriteCollectionFemale).create(name);
            }
            default: {
                return new Avatars(SpriteCollectionID).create(name);
            }
        }
    };
}