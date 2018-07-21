import * as mysql from 'mysql';
import { environment } from '../environment/environment';

export class Db {
    /**
     * Statically instantiates a new MySQL connection.
     */
    public static initMySQL(){
        const connection  = mysql.createConnection({
            host            : environment.db.host[0],
            user            : environment.db.user,
            password        : environment.db.password,
            database        : environment.db.database
        });
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            console.log('connected as id ' + connection.threadId);
        });

        return connection;
    }
}

/**
 * Exports a long-lived connection as a singleton.
 */
// export var connection = Db.initMySQL();
