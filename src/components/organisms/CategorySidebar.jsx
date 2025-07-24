import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategorySidebar = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  totalProducts = 0 
}) => {
  return (
    <motion.aside
      className="w-64 bg-white shadow-sm border-r border-slate-200 h-full"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Categories</h2>
        
        <div className="space-y-2">
          {/* All Products */}
          <button
            onClick={() => onCategorySelect(null)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-150",
              !selectedCategory 
                ? "bg-primary-50 text-primary-700 border border-primary-200" 
                : "hover:bg-slate-50 text-slate-700"
            )}
          >
            <div className="flex items-center gap-3">
              <ApperIcon name="Package" size={18} />
              <span className="font-medium">All Products</span>
            </div>
            <span className="text-sm font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
              {totalProducts}
            </span>
          </button>

          {/* Category List */}
          {categories.map((category) => (
            <motion.button
              key={category.Id}
              onClick={() => onCategorySelect(category.name)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-150",
                selectedCategory === category.name
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : "hover:bg-slate-50 text-slate-700"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <ApperIcon name="Tag" size={18} />
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-sm font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                {category.productCount}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default CategorySidebar;