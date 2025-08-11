const express = require("express");
const router = express.Router();
const {singleUpload} = require("../middleware/upload");

const {
    getAllUsers,
    getSingleUser,
    updateUser,
    uploadAvatar,
    deleteUser
} = require("../controllers/users");

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);
router.post("/uploadAvatar" , singleUpload , uploadAvatar);    
module.exports = router;