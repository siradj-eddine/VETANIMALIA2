const Product = require("../models/products");
const {StatusCodes} = require("http-status-codes");
const {NotFound} = require("../errors/indexErrors");
const cloudinary = require("../utils/cloudinary");
//get all products
const getAllProducts = async(req , res)=>{
    const products = await Product.find().sort("name");
    res.status(StatusCodes.OK).json({products , count : products.length})
}


//get single product
const getSingleProduct = async(req , res)=>{
    const {id : productID} = req.params;

    const product = await Product.findById({_id : productID});
    if(!product) throw new NotFound(`no product with the id : ${productID}`);

    res.status(StatusCodes.OK).json({product});
}

//create product
const createProduct = async(req , res)=>{
    const {name , category , price , description , available} = req.body
        if (!req.files || req.files.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please upload at least one image" });
        }
    
            // Process all uploaded images
            const imageUrls = await Promise.all(
                req.files.map(file => {
                    // For Cloudinary via multer-storage-cloudinary, path is already available                
                    return { url: file.path, publicId: file.filename };
                })
            );

    const product = await Product.create({
        name,
        category,
        price,
        description,
        available,
        image: imageUrls,
    });

        res.status(StatusCodes.CREATED).json({product});
}

//update Product
const updateProduct = async(req , res)=>{
    const {name , price , category , description , available} = req.body;
    const {id : productID} = req.params;

    const product = await Product.findOneAndUpdate({_id : productID},
    {name , price , category , description , available} , {runValidators:true , new:true});

    if(!product) throw new NotFound(`no product with the id : ${productID}`)
        res.status(StatusCodes.OK).json({product});
}


const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;

  // Find the product first
  const product = await Product.findById(productID);
  if (!product) throw new NotFound(`No product with the id: ${productID}`);


  if (product.image && product.image.length > 0) {
    for (const img of product.image) {
      try {
        await cloudinary.uploader.destroy(img.publicId);
      } catch (err) {
        console.error(`Failed to delete image ${img.publicId}:`, err.message);
      }
    }
  }

  // Delete the product from DB
  await Product.findByIdAndDelete(productID);
  res.status(StatusCodes.OK).json({ msg: "Product deleted successfully" });
};

module.exports = { deleteProduct };

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}