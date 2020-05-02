const {
    create,
    getSessionById,
    getSessions,
    updateSession,
    deleteSession
} = require("../models/session");

module.exports = {
    createSession: (req, res) => {
        const body = req.body;

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getSessionById: (req, res) => {
        const id = req.params.id;
        getSessionById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Session not found!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getSessions: (req, res) => {
        getSessions((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: " There is insufficient data to display! "
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateSession: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        getSessionById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Session does not exist!"
                });
            } else {
                updateSession(body, id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Update Succesful!"
                    });
                });
            }
        });


    },
    deleteSession: (req, res) => {
        const id = req.params.id;
        getSessionById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Session not found!"
                });
            } else {
                deleteSession(id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Session succesfully deleted"
                    });
                });
            }
        });
    }
}