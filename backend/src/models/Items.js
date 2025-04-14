import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema({
    itemID: {type:String, required: true, unique: true},
    name: {type: String, required: true}, // name of the item
    category: {type: String, required: true},
    imageURL: {type: String}, // URL to item's image
    price: {type: Number, required: true}, // price in "Save Points"
});

export default mongoose.model("Item", ItemsSchema);