import Badge from "@/components/atoms/Badge";

const StockBadge = ({ quantity, threshold }) => {
  const getStockStatus = () => {
    if (quantity === 0) return { variant: "error", text: "Out of Stock" };
    if (quantity <= threshold) return { variant: "warning", text: "Low Stock" };
    return { variant: "success", text: "In Stock" };
  };

  const status = getStockStatus();

  return (
    <div className="flex items-center gap-2">
      <Badge variant={status.variant}>
        {status.text}
      </Badge>
      <span className="text-sm font-medium text-slate-900">
        {quantity} units
      </span>
    </div>
  );
};

export default StockBadge;