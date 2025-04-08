import { Skeleton } from "../components/ui/skeleton"

const BalanceCardSkeleton = () => {
    return (
        <div className="bg-white shadow-md rounded-2xl p-4 space-y-4">
        <Skeleton height={24} width={150} /> {/* "Account Balance" */}
        <Skeleton height={32} width={100} /> {/* Balance number */}

        <div className="space-y-2">
            <Skeleton height={20} width={200} /> {/* "Recent Transactions" */}
            <Skeleton height={16} width="100%" />
            <Skeleton height={16} width="90%" />
            <Skeleton height={16} width="80%" />
        </div>
        </div>
    );
};

export default BalanceCardSkeleton;