import { connection } from '../db/db';
import {NextFunction} from "express";

export class VisitorRepository {

    private readonly mysql;

    constructor() {
        this.mysql = connection;
    }
    /**
     * MySQL: visitors.tb_visitor should be updated with new avatar information after the file has been generated.
     */
    public update = (name: string, id: number, next:NextFunction, cb) => {
        this.mysql.query('update visitors.tb_visitor set avatar = ?, updated = ? where id = ?',
            [name, (new Date()).getTime(), id], (err, results, fields) => {
                if (err) {
                    next(err);
                }
                cb(true);
            })
    };
    /**
     * Check wether User with desired ID exists in the Database. It's an obligatory condition for avatar file generation
     */
    public exists = (id: number, next:NextFunction,cb) => {
        this.mysql.query('select * from visitors.tb_visitor where id = ? limit 1', [id], (err, results) => {
            if (err) {
                next(err);
            }

            return cb(results && results.length);
        });
    };
}