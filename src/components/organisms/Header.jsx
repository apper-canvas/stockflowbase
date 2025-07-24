import { motion } from "framer-motion";
import React, { useContext } from "react";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onSearch, onAddProduct, lowStockCount = 0 }) => {
  const { logout } = useContext(AuthContext);

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
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Low Stock Indicator */}
            {lowStockCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-warning-50 text-warning-700 rounded-lg">
                <ApperIcon name="AlertTriangle" size={16} />
                <span className="text-sm font-medium">{lowStockCount} Low Stock</span>
              </div>
            )}

            {/* Add Product Button */}
            <Button onClick={onAddProduct} className="btn-primary">
              <ApperIcon name="Plus" size={16} />
              <span className="hidden sm:inline ml-2">Add Product</span>
            </Button>

            {/* Logout Button */}
            <Button
              onClick={logout}
              variant="ghost"
              className="text-slate-600 hover:text-slate-800"
            >
              <ApperIcon name="LogOut" size={16} />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;