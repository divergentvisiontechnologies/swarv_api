const {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    login
} = require("../controllers/user");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.put("/:id", checkToken, updateUser);
router.delete("/:id", checkToken, deleteUser);
router.post('/login', login);

module.exports = router;
