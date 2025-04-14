import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeaderDashboard from "./HeaderDashboard";
import InventoryItemCard from "../components/InventoryItemCard";

interface InventoryItem {
    id: string;
    name: string;
    category: string;
    imageUrl?: string;
  }

  const sampleInventoryItems: InventoryItem[] = [
    {
        id: "1",
        name: "Red Hoodie",
        category: "Clothing",
        imageUrl: "https://via.placeholder.com/100x100?text=Red+Hoodie",
    },
    {
        id: "2",
        name: "Space Helmet",
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/100x100?text=Space+Helmet",
    },
    {
        id: "3",
        name: "Wizard Hat",
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/100x100?text=Wizard+Hat",
    },
    {
        id: "4",
        name: "Sword",
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/100x100?text=Sword",
    },
    {
        id: "5",
        name: "White Gloves",
        category: "Accessories",
        imageUrl: "https://via.placeholder.com/100x100?text=White+Gloves",
      },
  ];
  
export const InventoryPage: React.FC = () => {
    const navigate = useNavigate();
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
                {sampleInventoryItems.map((item) => (
                    <InventoryItemCard 
                        key={item.id}
                        name={item.name}
                        category={item.category}
                        imageUrl={item.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};
  
export default InventoryPage;