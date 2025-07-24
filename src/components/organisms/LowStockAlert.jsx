import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const LowStockAlert = ({ lowStockProducts, onDismiss, onViewProduct }) => {
  if (!lowStockProducts || lowStockProducts.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="bg-gradient-to-r from-warning-500 to-warning-600 text-white shadow-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ApperIcon name="AlertTriangle" size={20} />
              <div>
                <p className="font-semibold">
                  {lowStockProducts.length} Product{lowStockProducts.length > 1 ? "s" : ""} Running Low
                </p>
                <p className="text-sm opacity-90">
                  {lowStockProducts.slice(0, 3).map(product => product.name).join(", ")}
                  {lowStockProducts.length > 3 && ` and ${lowStockProducts.length - 3} more`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewProduct(lowStockProducts[0])}
                className="text-white hover:bg-white/10"
              >
                View Details
              </Button>
              <button
                onClick={onDismiss}
                className="text-white/80 hover:text-white transition-colors"
              >
                <ApperIcon name="X" size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LowStockAlert;