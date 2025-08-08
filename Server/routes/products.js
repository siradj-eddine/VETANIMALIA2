const express = require("express");
const router = express.Router();
const {authMiddleware , adminAuth} = require("../middleware/authentication")
const {arrayUpload} = require("../middleware/upload");

const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/Products");

router.get("/" , getAllProducts)
router.get("/:id" , getSingleProduct);
router.post("/" , arrayUpload , authMiddleware , adminAuth , createProduct)
router.patch("/:id" , authMiddleware , adminAuth , updateProduct)
router.delete("/:id" , authMiddleware , adminAuth , deleteProduct)

module.exports = router;