import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ onSearch, onAddProduct, lowStockCount = 0 }) => {
  return (
    <motion.header
      className="bg-white shadow-sm border-b border-slate-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Package" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                StockFlow
              </h1>
              <p className="text-sm text-slate-500">Inventory Management</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <SearchBar 
              onSearch={onSearch} 
              placeholder="Search by name, SKU, or category..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {lowStockCount > 0 && (
              <motion.div
                className="flex items-center gap-2 px-3 py-2 bg-warning-50 text-warning-700 rounded-lg border border-warning-200"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ApperIcon name="AlertTriangle" size={16} />
                <span className="text-sm font-medium">
                  {lowStockCount} low stock
                </span>
              </motion.div>
            )}
            <Button onClick={onAddProduct}>
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;