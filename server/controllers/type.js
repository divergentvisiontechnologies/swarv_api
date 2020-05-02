const {
    create,
    getTypeById,
    getTypes,
    updateType,
    deleteType
} = require("../models/type");

module.exports = {
    createType: (req, res) => {
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
    getTypeById: (req, res) => {
        const type_id = req.params.type_id;
        getTypeById(type_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Type not found!"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getTypes: (req, res) => {
        getTypes((err, results) => {
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
    updateType: (req, res) => {
        const body = req.body;
        const type_id = req.params.type_id;
        getTypeById(type_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "type does not exist!"
                });
            } else {
                updateType(body, type_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "update Succesful!"
                    });
                });
            }
        });


    },
    deleteType: (req, res) => {
        const type_id = req.params.type_id;
        getTypeById(type_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Type not found!"
                });
            } else {
                deleteType(type_id, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Type succesfully deleted"
                    });
                });
            }
        });
    }
}