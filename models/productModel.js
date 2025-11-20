import mongoose from "mongoose";
const counterSchema = new mongoose.Schema ({
    id : {type: String, required: true},
    seq : {type: Number, default: 0}
});

const counter = mongoose.model("counter", counterSchema);

const productSchema = new mongoose.Schema({
    productid: {type: Number, unique: true},
    productname: {type: String, required: true},
    description: {type: String, required: true},
    categoryid: {type: mongoose.Schema.Types.ObjectId, ref: "category"},  
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    imageurl: {type: String},
    rating: {type: Number, required: true}
});

productSchema.pre("save", async function (next) {
    if (this.isNew) {
        const counterDoc = await counter.findOneAndUpdate(
            {id:"productid"},
            {$inc: {seq: 1}},
            {new: true, upsert: true}
        );
        this.productid = counterDoc.seq;
        console.log("assingningproductid", this.productid);
    }
    next();
});


export default mongoose.model("Product", productSchema);