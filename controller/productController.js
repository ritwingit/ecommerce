import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
    try{
        const product = new Product (req.body);
        await product.save();
        res.status(201).json ({message: "product created", product});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

export const getAllProduct = async (req, res) => {
    const product = await Product.find().populate("categoryid");
};
