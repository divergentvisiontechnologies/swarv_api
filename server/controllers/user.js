const {
    create,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUsername
} = require("../models/user");

const {
    genSaltSync,
    hashSync,
    compareSync
} = require("bcrypt");
const {
    sign
} = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const user_id = req.params.user_id;
        getUserById(user_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    succes: 0,
                    message: "User not found!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(204).json({
                    success: 0,
                    message: "There is insufficient data to display!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        const user_id = req.params.user_id;
        getUserById(user_id, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!result) {
                return res.status(404).json({
                    success: 0,
                    message: "User does not exist!"
                });
            } else {
                updateUser(body, user_id, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Succesfully updated!"
                    });
                });
            }
        });


    },
    deleteUser: (req, res) => {
        const data = req.params.user_id;
        getUserById(data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!result) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found!"
                });
            } else {
                deleteUser(data, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "User succesfully deleted"
                    });
                });
            }
        });

    },
    login: (req, res) => {
        const body = req.body;
        getUserByUsername(body.username, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.status(401).json({
                    success: 0,
                    data: "Username or psassword incorrect!1"
                });
            }
            const result = compareSync(body.password, results.password);
            // incase theres an error when testing this moet je ipv results.password: results[0].password schrijven
            if (result) {
                results.password = undefined;
                const jsonToken = sign({
                    result: results
                }, process.env.KEY, {
                    expiresIn: "10h"
                });
                return res.status(200).json({
                    success: 1,
                    message: "Login Succesful",
                    token: jsonToken,
                    user_id: results.user_id
                });
            } else {
                return res.status(401).json({
                    success: 0,
                    data: "Username or password incorrect!"
                });
            }
        });
    }
};