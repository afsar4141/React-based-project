// Skeleton card shown while products load.
const LoadingProduct = () => {
    return (
        <div className="w-full h-[65vh] shadow-lg p-3 animate-pulse">
            <div className="h-[55%] bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded mt-5 w-3/4" />
            <div className="h-4 bg-gray-200 rounded mt-4" />
            <div className="h-4 bg-gray-200 rounded mt-2 w-5/6" />
        </div>
    );
};

export default LoadingProduct;
