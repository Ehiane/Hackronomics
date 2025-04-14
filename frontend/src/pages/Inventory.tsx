import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeaderDashboard from "./HeaderDashboard";
import InventoryItemCard from "../components/InventoryItemCard";

interface InventoryItem {
    itemID: string;
    name: string;
    category: string;
    imageUrl: string;
    price: number;
    equipped?: boolean;
  }

export const InventoryPage: React.FC = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const token = localStorage.getItem("token");
            const userID = localStorage.getItem("userID"); 

            if (!token || !userID) return;

            try {
                // Start by getting user item list
                const userItemsListResponse = await fetch(`http://localhost:5001/api/userItemList/get/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!userItemsListResponse.ok) {
                    console.error("Failed to fetch user item list");
                    return;
                }
                const userItemList = await userItemsListResponse.json();

                // Next we'll get the items from the inventory
                const inventoryItemsResponse = await fetch(`http://localhost:5001/api/items/getAll`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!inventoryItemsResponse.ok) {
                    console.error("Failed to fetch inventory items");
                    return;
                }

                const allItems = await inventoryItemsResponse.json();

                // Next, we'll filter out the items that are not in the user item list
                const inventoryWithDetails = userItemList.itemList.map((userItem: any) => {
                    const itemDetails = allItems.find((item: any) => item.itemID === userItem.itemID);
                    return itemDetails ? { ...itemDetails, equipped: userItem.equipped } : null;
                }).filter(Boolean);

                // For each item, include the equipped status, set to true if the item is in the user item list
                // const inventory = inventoryWithDetails.map((item: InventoryItem) => {
                //     return {
                //         ...item,
                //         equipped: userItemList.some((userItem: { itemID: string }) => userItem.itemID === item.itemID),
                //     };
                // });

                

                setItems(inventoryWithDetails);
            } catch (error) {
                console.error("Error with setting up the inventory:", error);
            }
        };

        fetchInventoryItems();
    }, []);

    return (
        <div className="p-6">
            <button 
                onClick={() => navigate("/dashboard")}
                className="back-button mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                ⬅ Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold mb-6 text-right">Inventory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.length > 0 ? (
                    items.map((item) => (
                        <InventoryItemCard 
                            key={item.itemID}
                            item={item}
                        />
                    ))
                ) : (
                    <h3 className="text-center col-span-full">No items to show!</h3>
                )}
            </div>
        </div>
    );
};
  
export default InventoryPage;