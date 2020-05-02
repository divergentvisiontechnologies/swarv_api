const pool = require("../../config/config");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      'insert into type(type) values(?)',
      [data.type],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getTypes: callBack => {
    pool.query(
      `select * from type`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getTypeById: (id, callBack) => {
    pool.query(
      `select * from type where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateType: (data, id, callBack) => {
    pool.query(
      'update type set type = ? where id = ?',
      [
        data.type,
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
  deleteType: (id, callBack) => {
    pool.query(
      `delete from type where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
