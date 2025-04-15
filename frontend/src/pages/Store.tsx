import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreItemCard from "../components/StoreItemCard";

interface StoreItem {
    itemID: string;
    name: string;
    price: number;
    category: string;
    imageUrl?: string;
    isOwned: boolean;
}

interface UserInventoryItem {
    itemID: string;
    quantity: number;
}

interface Points {
    points: number;
}

const StorePage: React.FC = () => {
    const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
    const [userItems, setUserItems] = useState<UserInventoryItem[]>([]);
    const [points, setPoints] = useState<Points>({ points: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("userID");
        if (!token || !userID) return;
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const userID = localStorage.getItem("userID");
            if (!token || !userID) return;
        
            try {
                // 1. Fetch points
                const pointsResponse = await fetch(`http://localhost:5001/api/points/get/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
        
                if (!pointsResponse.ok) {
                    console.error("Failed to fetch points");
                } else {
                    const pointsData = await pointsResponse.json();
                    setPoints({ points: pointsData.points });
                }
        
                // 2. Fetch user items
                const userItemsResponse = await fetch(`http://localhost:5001/api/userItemList/get/${userID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
        
                if (!userItemsResponse.ok) {
                    console.error("Failed to fetch user item list");
                    return;
                }
        
                const userItemList = await userItemsResponse.json();
                const fetchedUserItems: UserInventoryItem[] = userItemList.itemList;
                setUserItems(fetchedUserItems);
        
                // 3. Fetch store items and calculate ownership
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
        
                // Use freshly fetched user items to check for ownership
                const inventoryWithDetails = allItems.map((item: StoreItem) => {
                    const isOwned = fetchedUserItems.some((userItem: UserInventoryItem) => userItem.itemID === item.itemID);
                    return {
                        ...item,
                        isOwned: isOwned,
                    };
                });
        
                setStoreItems(inventoryWithDetails);
            } catch (error) {
                console.error("Error fetching store data:", error);
            }
        };
        
        fetchData();
    }, []);

    const handlePurchase = async (item: StoreItem) => {
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("userID");
        if (!userID || !token) return;
        if (points.points < item.price) return; // Not enough points

        try {
            // 1. Add item to user item list
            console.log("Purchasing:", `userItemList/add/${userID}/${item.itemID}`)
            await fetch(`http://localhost:5001/api/userItemList/add/${userID}/${item.itemID}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            // 2. Deduct points
            const updatedPoints = points.points - item.price;

            console.log("Updating points:", `points/update/${userID}/${updatedPoints}`)
            await fetch(`http://localhost:5001/api/points/update/${userID}/${updatedPoints}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            // 3. Update UI
            setPoints({ points: updatedPoints });
            setUserItems([...userItems, { itemID: item.itemID, quantity: 1 }]);
            setStoreItems((prev) =>
                prev.map((i) =>
                    i.itemID === item.itemID ? { ...i, isOwned: true } : i
                )
            );
        } catch (err) {
            console.error("Error purchasing item:", err);
        }
    };

    return (
        <div className="p-6 mb-12">
            <button
                onClick={() => navigate("/dashboard")}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                ⬅ Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Store</h2>
            <h3 className="text-lg mb-4 text-center">Purchase items to enhance your avatar!</h3>
            <h4 className="text-md mb-4 text-center">Current Points: {points.points}</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {storeItems.map((item) => (
                    <StoreItemCard
                        key={item.itemID}
                        name={item.name}
                        price={item.price}
                        category={item.category}
                        imageUrl={item.imageUrl}
                        isOwned={item.isOwned}
                        onPurchase={() => handlePurchase(item)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StorePage;
