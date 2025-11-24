interface SkeletonLoaderProps {
  rows?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ rows = 5 }) => {
  return (
    <div className="base_card">
      <div className="space-y-3 py-4">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
