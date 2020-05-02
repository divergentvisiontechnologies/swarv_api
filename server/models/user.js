const pool = require("../../config/config");


module.exports = {
    create: (data, callBack) => {
        pool.query(
            'insert into users(username, type_id, email, password) values(?,?,?,?)',
            [
                data.usernname,
                data.type_id,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select * from users inner join type on users.type_id=type.type_id`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(`select * from users inner join type on users.type_id=type.id where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, id, callBack) => {
        pool.query('update user set username = ?, type_id = ?, email = ?, password = ? where id = ?',
            [
                data.usernname,
                data.type_id,
                data.email,
                data.password,
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (id, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUsername: (usernname, callBack) => {
        pool.query(
            'select * from users where username = ?',
            [usernname],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );

    }
};