import React from "react";
import Card, { CardContent } from "./Card";

interface InventoryItemProps {
    item: {
        itemID: string;
        name: string;
        category: string;
        imageUrl?: string;
        price: number;
        equipped?: boolean;
    }
}

export const InventoryItemCard: React.FC<InventoryItemProps> = ({ item }) => {
     return (
        <Card className="bg-white w-full max-w-xs">
            <CardContent>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                    <h3 className="text-lg font-bold">{item.category}</h3>
                </div>
            </CardContent>
        </Card>
  );
};

export default InventoryItemCard;
