const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.KEY, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        success: 0,
                        message: "Invalid Token!"
                    });
                } else {
                    next();
                }
            });

        } else {
            res.status(403).json({
                success: 0,
                message: "Access Denied!"
            });
        }
    }
};