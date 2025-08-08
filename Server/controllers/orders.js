const Order = require("../models/orders");
const Product = require("../models/products")
const {StatusCodes} = require("http-status-codes");
const {BadRequest, NotFound} = require("../errors/indexErrors");


//get all orders
const getAllOrders = async(req , res)=>{
    const orders = await Order.find()
        .populate("user" , "name , email , phone").populate("products.product" , "name").sort("-createdAt");
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
}

//get single order
const getSingleOrder = async(req , res)=>{
    const {id : orderID} = req.params;

    const order = await Order.findById({_id : orderID})
    .populate("user" , "name , email").populate("products.product.name" , "name");
    
    if(!order) throw new NotFound(`no Order with the id : ${orderID}`);

    res.status(StatusCodes.OK).json({order});
}

//create order
const createOrder = async(req , res)=>{
    const {products , status , name , willaya ,adress , phoneNb , email , additional_Info} = req.body;
    
    if(!products || products.length === 0) throw new BadRequest("Please Provide products");
    const productsIds = products.map(p=>p.product);    
    const foundProducts = await Product.find({_id : {$in : productsIds}});
    if(foundProducts.length !== products.length) throw new BadRequest("one or more wrong products (doesnt exist)");

    const order = await Order.create({products , status, name , willaya , adress , phoneNb , email , additional_Info});
    res.status(StatusCodes.CREATED).json({ order });
}

  //update order 
    const updateOrder = async(req , res)=>{
        const {status} = req.body;
        const {id : orderID} = req.params;

        const order = await Order.findOneAndUpdate({_id : orderID},
        {status} , {runValidators:true , new:true})
        if(!order) throw new NotFound(`no Order with the id : ${orderID}`);
        res.status(StatusCodes.OK).json({order});
    }


//deleteOrder
const deleteOrder = async(req , res)=>{
    const {id : orderID} = req.params;
    const order =await Order.findOneAndDelete({_id : orderID});

    if(!order) throw new NotFound(`no Order with the id : ${orderID}`);

    res.status(StatusCodes.OK).send("order deleted successfully");
}

  


module.exports = {
    getAllOrders,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder
}