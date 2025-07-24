import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import StockBadge from "@/components/molecules/StockBadge";
import Button from "@/components/atoms/Button";

const ProductTable = ({ 
  products, 
  onEditProduct, 
  onDeleteProduct, 
  onAdjustStock,
  sortBy,
  sortDirection,
  onSort 
}) => {
  const handleSort = (field) => {
    if (sortBy === field) {
      onSort(field, sortDirection === "asc" ? "desc" : "asc");
    } else {
      onSort(field, "asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <ApperIcon name="ArrowUpDown" size={14} className="text-slate-400" />;
    return sortDirection === "asc" ? 
      <ApperIcon name="ArrowUp" size={14} className="text-primary-600" /> : 
      <ApperIcon name="ArrowDown" size={14} className="text-primary-600" />;
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("sku")}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary-600 transition-colors"
                >
                  SKU
                  <SortIcon field="sku" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary-600 transition-colors"
                >
                  Product Name
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("category")}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary-600 transition-colors"
                >
                  Category
                  <SortIcon field="category" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("price")}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary-600 transition-colors"
                >
                  Price
                  <SortIcon field="price" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort("quantity")}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary-600 transition-colors"
                >
                  Stock Status
                  <SortIcon field="quantity" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-semibold text-slate-700">
                  Last Updated
                </span>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-sm font-semibold text-slate-700">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product, index) => (
              <motion.tr
                key={product.Id}
                className="table-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-slate-600">
                    {product.sku}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {product.name}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                    <ApperIcon name="Tag" size={12} />
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StockBadge 
                    quantity={product.quantity} 
                    threshold={product.lowStockThreshold} 
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-500">
                    {format(new Date(product.lastUpdated), "MMM d, yyyy")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAdjustStock(product)}
                    >
                      <ApperIcon name="Plus" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditProduct(product)}
                    >
                      <ApperIcon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteProduct(product)}
                    >
                      <ApperIcon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;