import { motion } from "framer-motion";

const Loading = ({ type = "table" }) => {
  if (type === "table") {
    return (
      <div className="space-y-4">
        {/* Table header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-100 rounded-md w-48 animate-pulse" />
          <div className="h-10 bg-gradient-to-r from-primary-200 to-primary-100 rounded-md w-32 animate-pulse" />
        </div>
        
        {/* Table rows skeleton */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-slate-200">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gradient-to-r from-slate-300 to-slate-200 rounded animate-pulse"
              />
            ))}
          </div>
          
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="grid grid-cols-6 gap-4 p-4 border-b border-slate-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: rowIndex * 0.1 }}
            >
              {Array.from({ length: 6 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded animate-pulse"
                  style={{
                    animationDelay: `${(rowIndex * 6 + colIndex) * 50}ms`
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="space-y-4">
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-100 rounded animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded animate-pulse w-3/4" />
              <div className="flex justify-between">
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded animate-pulse w-1/4" />
                <div className="h-6 bg-gradient-to-r from-primary-200 to-primary-100 rounded-full animate-pulse w-16" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loading;