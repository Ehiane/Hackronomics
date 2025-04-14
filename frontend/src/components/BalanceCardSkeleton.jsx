import { Skeleton } from "../components/ui/skeleton"
import Card, { CardContent } from "./Card";

const BalanceCardSkeleton = () => {
return (
        <Card className="bg-white shadow-md rounded-2xl p-4">
            <CardContent>
                {/* Title and Balance */}
                <Skeleton className="h-6 w-40 mb-2 bg-gray-200" /> {/* "Account Balance" title */}
                <Skeleton className="h-8 w-32 mb-4 bg-gray-300" /> {/* Balance number */}

                {/* Recent Transactions Title */}
                <Skeleton className="h-5 w-48 mb-2 bg-gray-200" /> {/* "Recent Transactions" */}

                {/* Placeholder lines for 3 transactions */}
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                    <Skeleton className="h-4 w-3/4 bg-gray-200" />
                    <Skeleton className="h-4 w-2/3 bg-gray-200" />
                </div>
            </CardContent>
        </Card>
    );
};

export default BalanceCardSkeleton;