import mongoose from "mongoose";

const UserItemListSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    itemList: [
        {
            itemID: {type: String, required: true},
            quantity: {type: Number, required: true},
        }
    ] 
});

export default mongoose.model("UserItemList", UserItemListSchema);