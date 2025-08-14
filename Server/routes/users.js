const express = require("express");
const router = express.Router();
const {singleUpload} = require("../middleware/upload");

const {
    getAllUsers,
    getSingleUser,
    updateUser,
    uploadAvatar,
    deleteUser,
    getCurrentUser
} = require("../controllers/users");
const { adminAuth } = require("../middleware/authentication");

router.route("/" , adminAuth).get(getAllUsers);
router.route("/me").get(getCurrentUser);
router.route("/:id" , adminAuth).get(getSingleUser).patch(updateUser).delete(deleteUser);
router.post("/uploadAvatar" , singleUpload , uploadAvatar);
module.exports = router;