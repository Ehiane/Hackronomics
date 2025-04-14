import React from "react";
import { useNavigate } from "react-router-dom";
import StoreItemCard from "../components/StoreItemCard";

interface StoreItem {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl?: string;
    isOwned: boolean;
  }

interface Points {
    points: number;
}

const sampleStoreItems: StoreItem[] = [
    {
        id: "1",
        name: "Red Hoodie",
        price: 100,
        category: "Clothing",
        imageUrl: "https://via.placeholder.com/100x100?text=Red+Hoodie",
        isOwned: false,
    },
    {
        id: "2",
        name: "Space Helmet",
        price: 250,
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/100x100?text=Space+Helmet",
        isOwned: true,
    },
    {
        id: "3",
        name: "Wizard Hat",
        price: 180,
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/100x100?text=Wizard+Hat",
        isOwned: false,
    },
    {
        id: "4",
        name: "Sword",
        price: 300,
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/100x100?text=Sword",
        isOwned: false,
    },
    {
        id: "5",
        name: "White Gloves",
        price: 100,
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/100x100?text=White+Gloves",
        isOwned: true,
      },
  ];
  
export const StorePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="p-6">
            <button 
                onClick={() => navigate("/dashboard")}
                className="back-button mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                ⬅ Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold mb-6 text-right">Store</h2>
            <h3 className="text-lg mb-4 text-center">Purchase items to enhance your avatar!</h3>
            <h4 className="text-md mb-4 text-center">Current Points: </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sampleStoreItems.map((item) => (
                    <StoreItemCard 
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        category={item.category}
                        imageUrl={item.imageUrl}
                        isOwned={item.isOwned}
                    />
                ))}
            </div>
        </div>
    );
};
  
export default StorePage;