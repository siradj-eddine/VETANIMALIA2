const User = require("../models/users");
const {StatusCodes} = require("http-status-codes")
const {BadRequest, Unauthenticated} = require("../errors/indexErrors");

const register = async(req , res)=>{
    
    const user = await User.create({...req.body});
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({user : {name : user.name , role : user.role}, token})    
}


const login = async(req , res)=>{
    const {email , password} = req.body;
    if(!email || !password) throw new BadRequest("Please enter an email or password");

    const user = await User.findOne({email});
    if(!user) throw new Unauthenticated("Invalid Credentials");

    const isMatched = await user.comparePasswords(password)
    if(!isMatched) throw new Unauthenticated("wrong email or password");

    const token = await user.createJWT();

    res.status(StatusCodes.OK).json({user : {name : user.name , role : user.role} , token})
}

module.exports = {register , login}