const pool = require("../../config/config");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      'insert into session(title, subtitle, artist, lyrics, audio) values(?,?,?,?,?)',
      [
          data.title,
          data.subtitle,
          data.artist,
          data.lyrics,
          data.audio 
        ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSessions: callBack => {
    pool.query(
      `select * from session`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSessionById: (id, callBack) => {
    pool.query(
      `select * from session where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateSession: (data, id, callBack) => {
    pool.query(
      'update session set title = ?, subtitle = ?, artist = ?, lyrics = ?, audio= where id = ?',
      [
        data.title,
        data.subtitle,
        data.artist,
        data.lyrics,
        data.audio,
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
  deleteSession: (id, callBack) => {
    pool.query(
      `delete from session where id = ?`,
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
