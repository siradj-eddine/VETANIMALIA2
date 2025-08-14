const {NotFound, CustomError, BadRequest} = require("../errors/indexErrors");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/users");
const { StatusCodes } = require("http-status-codes");

//get all users
const getAllUsers = async(req , res)=>{
    const users = await User.find().sort("name");
    res.status(StatusCodes.OK).json({users , count : users.length});
}

//get single user
const getSingleUser = async(req , res)=>{
    const {id : userID} = req.params;
    
    const user = await User.findById({_id : userID});
    if(!user) throw new NotFound(`no user with the id : ${userID}`);
    res.status(StatusCodes.OK).json({user})
}


const getCurrentUser = async(req , res)=>{
    const user = await User.findById(req.user.userID);
    if(!user) throw new NotFound(`no user with the id : ${req.user.userID}`);
    res.status(StatusCodes.OK).json({user});
}

//update user
const updateUser = async(req , res)=>{
    const {name , phone} = req.body;

    if(!phone && !name) throw new BadRequest("at least update one field");
    const user = await User.findByIdAndUpdate({_id : req.params.id} , {name , phone} , {new:true})
    if(!user) throw new NotFound(`no user with the id : ${req.params.userID}`)

        res.status(StatusCodes.OK).json({user});
}

//upload avatar
const uploadAvatar = async (req , res)=>{
    console.log(req.file);
    
    if (!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Please upload an image" });
    }
    
    
    const user = await User.findById(req.user.userID);
    if(!user) throw new NotFound(`no user with the id ${req.user.userID}`);

    if (user.avatar && user.avatar.publicId) {
        await cloudinary.uploader.destroy(user.avatar.publicId);
      }

      user.avatar = {url: req.file.path , publicId: req.file.filename};
      await user.save();

      res.status(StatusCodes.OK).json({avatar : user.avatar.url});
}


//delete user
const deleteUser = async(req , res)=>{
    const {id : userID} = req.params;
    const user = await User.findOneAndDelete({_id : userID});
    if(!user) throw new NotFound(`no user with the id : ${userID}`);
    res.status(StatusCodes.OK).send("user deleted successfully");
}

module.exports = {
    getAllUsers,
    getSingleUser,
    getCurrentUser,
    updateUser,
    uploadAvatar,
    deleteUser,
}