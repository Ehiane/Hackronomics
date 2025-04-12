import UserItemList from "../models/UserItemList.js";

export const createOrGetUserItemList = async (userID) => {
    if (!userID) throw new Error("Missing userID");

    const existingItemList = await UserItemList.findOne({ userID });
    if (existingItemList) return existingItemList;

    const newItemList = await UserItemList.create({ userID, itemList: [] });
    console.log(`Created new item list entry for userID: ${userID}`);
    return newItemList;
}