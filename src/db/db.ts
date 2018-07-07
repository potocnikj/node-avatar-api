import * as mysql from 'mysql';
import * as config from 'config';

import { environment } from '../environment/environment';

export class Db {

    //TODO: When creating a connection to the DB host, a random read host must be selected and pinged if it's alive.
    //TODO: In case of DB server unavailability, other hosts must be tried until :
    //TODO: A --> A living server has been found, in this case, connect to it.
    //TODO: B --> All servers had been found, return a JSON response with 500 status and explanation of DB failure.
    /**
     * Statically instantiates a new MySQL connection.
     */
    public static initMySQL(){
        console.log(environment);
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
export var connection = Db.initMySQL();
