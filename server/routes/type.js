const {
    createType,
    getTypeById,
    getTypes,
    updateType,
    deleteType
} = require("../controllers/type");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createType);
router.get("/", checkToken, getTypes);
router.get("/:id", checkToken, getTypeById);
router.put("/:id", checkToken, updateType);
router.delete("/:id", checkToken, deleteType);

module.exports = router;
