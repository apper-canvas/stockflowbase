import { useState, useEffect } from "react";
import { productService } from "@/services/api/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    const newProduct = await productService.create(productData);
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id, productData) => {
    const updatedProduct = await productService.update(id, productData);
    setProducts(prev => prev.map(p => p.Id === parseInt(id) ? updatedProduct : p));
    return updatedProduct;
  };

  const deleteProduct = async (id) => {
    await productService.delete(id);
    setProducts(prev => prev.filter(p => p.Id !== parseInt(id)));
  };

  const adjustStock = async (id, adjustment) => {
    const updatedProduct = await productService.adjustStock(id, adjustment);
    setProducts(prev => prev.map(p => p.Id === parseInt(id) ? updatedProduct : p));
    return updatedProduct;
  };

  const searchProducts = async (query) => {
    try {
      setLoading(true);
      setError("");
      const data = query ? await productService.searchProducts(query) : await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to search products");
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getByCategory(category);
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to filter products");
    } finally {
      setLoading(false);
    }
  };

  const getLowStockProducts = async () => {
    try {
      return await productService.getLowStockProducts();
    } catch (err) {
      console.error("Failed to get low stock products:", err);
      return [];
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    searchProducts,
    filterByCategory,
    getLowStockProducts
  };
};