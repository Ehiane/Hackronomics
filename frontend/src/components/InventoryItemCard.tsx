import React from "react";
import Card, { CardContent } from "./Card";

interface InventoryItemCardProps {
    name: string;
    category: string;
    imageUrl?: string;
    equipped?: boolean;
}

export const InventoryItemCard: React.FC<InventoryItemCardProps> = ({ name, category, imageUrl, equipped }) => {
     return (
        <Card className="bg-white w-full max-w-xs">
            <CardContent>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-2">{name}</h2>
                    <h3 className="text-lg font-bold">{category}</h3>
                    {equipped && <p className="text-green-500 mt-2">Equipped</p>}
                </div>
            </CardContent>
        </Card>
  );
};

export default InventoryItemCard;
