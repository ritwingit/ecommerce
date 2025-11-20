import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
    try{
        const {name ,slug} = req.body;
        const category = new Category ({name ,slug});
        await category.save();
        res.status(201).json ({message: "category created", category});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

export const getAllCategories = async(req, res) => {
    const categories= await Category.find();
    res.json(categories);
};