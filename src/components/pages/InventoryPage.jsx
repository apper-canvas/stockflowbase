import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import ProductTable from "@/components/organisms/ProductTable";
import ProductModal from "@/components/organisms/ProductModal";
import StockAdjustmentModal from "@/components/organisms/StockAdjustmentModal";
import LowStockAlert from "@/components/organisms/LowStockAlert";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { stockAdjustmentService } from "@/services/api/stockAdjustmentService";

const InventoryPage = () => {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    searchProducts,
    filterByCategory,
    getLowStockProducts
  } = useProducts();

  const { 
    categories, 
    loading: categoriesLoading 
  } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [showLowStockAlert, setShowLowStockAlert] = useState(true);

  // Load low stock products
  useEffect(() => {
    const loadLowStock = async () => {
      const lowStock = await getLowStockProducts();
      setLowStockProducts(lowStock);
    };
    if (!productsLoading) {
      loadLowStock();
    }
  }, [products, productsLoading, getLowStockProducts]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });

  const handleSearch = async (query) => {
    await searchProducts(query);
    setSelectedCategory(null);
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await filterByCategory(category);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await deleteProduct(product.Id);
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleAdjustStock = (product) => {
    setSelectedProduct(product);
    setShowStockModal(true);
  };

  const handleProductSubmit = async (productData) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.Id, productData);
        toast.success("Product updated successfully");
      } else {
        await createProduct(productData);
        toast.success("Product added successfully");
      }
    } catch (error) {
      toast.error(`Failed to ${selectedProduct ? "update" : "add"} product`);
      throw error;
    }
  };

const handleStockAdjustment = async (adjustmentData) => {
    try {
      await adjustStock(selectedProduct.Id, adjustmentData);
      await stockAdjustmentService.create({
        productId: selectedProduct.Id,
        ...adjustmentData
      });
      toast.success("Stock adjusted successfully");
    } catch (error) {
      toast.error("Failed to adjust stock");
      throw error;
    }
  };

  const handleSort = (field, direction) => {
    setSortBy(field);
    setSortDirection(direction);
  };

  if (productsLoading || categoriesLoading) {
    return <Loading type="table" />;
  }

  if (productsError) {
    return <Error message={productsError} onRetry={loadProducts} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Low Stock Alert */}
      {showLowStockAlert && lowStockProducts.length > 0 && (
        <LowStockAlert
          lowStockProducts={lowStockProducts}
          onDismiss={() => setShowLowStockAlert(false)}
          onViewProduct={handleEditProduct}
        />
      )}

      {/* Header */}
      <Header
        onSearch={handleSearch}
        onAddProduct={handleAddProduct}
        lowStockCount={lowStockProducts.length}
      />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            totalProducts={products.length}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {sortedProducts.length === 0 ? (
              <Empty
                title="No products found"
                description="Start building your inventory by adding your first product."
                actionLabel="Add Product"
                onAction={handleAddProduct}
                icon="Package"
              />
            ) : (
              <ProductTable
                products={sortedProducts}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
                onAdjustStock={handleAdjustStock}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSubmit={handleProductSubmit}
        product={selectedProduct}
        categories={categories}
      />

      <StockAdjustmentModal
        isOpen={showStockModal}
        onClose={() => setShowStockModal(false)}
        onSubmit={handleStockAdjustment}
        product={selectedProduct}
      />
    </div>
  );
};

export default InventoryPage;