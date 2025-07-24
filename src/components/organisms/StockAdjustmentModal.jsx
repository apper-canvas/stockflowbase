import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";

const StockAdjustmentModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  product = null
}) => {
  const [formData, setFormData] = useState({
    type: "adjustment",
    quantity: "",
    reason: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const adjustmentTypes = [
    { value: "adjustment", label: "Stock Adjustment", icon: "Edit" },
    { value: "restock", label: "Restock", icon: "Plus" },
    { value: "sale", label: "Sale", icon: "Minus" },
    { value: "damage", label: "Damage/Loss", icon: "AlertTriangle" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.quantity || formData.quantity === "0") {
      newErrors.quantity = "Quantity is required";
    }
    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const adjustmentQuantity = parseInt(formData.quantity);
      const finalQuantity = formData.type === "sale" || formData.type === "damage" 
        ? -Math.abs(adjustmentQuantity) 
        : Math.abs(adjustmentQuantity);

      await onSubmit({
        ...formData,
        quantity: finalQuantity
      });
      onClose();
      setFormData({ type: "adjustment", quantity: "", reason: "" });
    } catch (error) {
      console.error("Error submitting adjustment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Adjust Stock
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          <div className="p-6">
            {/* Product Info */}
            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
              <h3 className="font-medium text-slate-900">{product.name}</h3>
              <p className="text-sm text-slate-600">SKU: {product.sku}</p>
              <p className="text-sm text-slate-600">Current Stock: {product.quantity} units</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Adjustment Type"
                error={errors.type}
                required
              >
                <div className="grid grid-cols-2 gap-2">
                  {adjustmentTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleChange("type", type.value)}
                      className={`p-3 rounded-lg border-2 transition-colors text-left ${
                        formData.type === type.value
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ApperIcon name={type.icon} size={16} />
                        <span className="text-sm font-medium">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField
                label="Quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                error={errors.quantity}
                placeholder="Enter quantity"
                required
              />

              <FormField
                label="Reason"
                value={formData.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
                error={errors.reason}
                placeholder="Enter reason for adjustment"
                required
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                >
                  Apply Adjustment
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StockAdjustmentModal;