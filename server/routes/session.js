const {
    createSession,
    getSessionById,
    getSessions,
    updateSession,
    deleteSession
} = require("../controllers/session");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createSession);
router.get("/", checkToken, getSessions);
router.get("/:id", checkToken, getSessionById);
router.put("/:id", checkToken, updateSession);
router.delete("/:id", checkToken, deleteSession);

module.exports = router;
