import React from "react";
import Card, { CardContent } from "./Card";

interface StoreItemCardProps {
    name: string;
    price: number;
    category: string;
    imageUrl?: string;
    isOwned: boolean;
}

export const StoreItemCard: React.FC<StoreItemCardProps> = ({ name, price, category, imageUrl, isOwned }) => {
    return (
        <Card className="bg-white w-full max-w-xs">
            <CardContent>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-2">{name}</h2>
                    <h3 className="text-lg font-bold">{category}</h3>
                    <p className="text-gray-600">${price}</p>
                    {isOwned ? (
                        <p className="text-green-500 mt-2">Owned</p>
                    ) : (
                        <button 
                        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">
                            Purchase
                        </button>
                    )}
                </div>
            </CardContent>
        </Card>
  );
};

export default StoreItemCard;
