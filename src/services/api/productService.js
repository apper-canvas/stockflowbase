import productsData from "@/services/mockData/products.json";

let products = [...productsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...products];
  },

  async getById(id) {
    await delay(200);
    const product = products.find(p => p.Id === parseInt(id));
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async create(productData) {
    await delay(400);
    const newId = Math.max(...products.map(p => p.Id)) + 1;
    const newProduct = {
      ...productData,
      Id: newId,
      lastUpdated: new Date().toISOString()
    };
    products.push(newProduct);
    return { ...newProduct };
  },

  async update(id, productData) {
    await delay(350);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    const updatedProduct = {
      ...products[index],
      ...productData,
      Id: parseInt(id),
      lastUpdated: new Date().toISOString()
    };
    products[index] = updatedProduct;
    return { ...updatedProduct };
  },

  async delete(id) {
    await delay(250);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    products.splice(index, 1);
    return { success: true };
  },

  async adjustStock(id, adjustment) {
    await delay(300);
    const index = products.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Product not found");
    }
    const product = products[index];
    const newQuantity = Math.max(0, product.quantity + adjustment.quantity);
    
    const updatedProduct = {
      ...product,
      quantity: newQuantity,
      lastUpdated: new Date().toISOString()
    };
    products[index] = updatedProduct;
    return { ...updatedProduct };
  },

  async getLowStockProducts(threshold = null) {
    await delay(200);
    return products.filter(product => {
      const stockThreshold = threshold || product.lowStockThreshold;
      return product.quantity <= stockThreshold;
    });
  },

  async searchProducts(query) {
    await delay(250);
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.sku.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  },

  async getByCategory(category) {
    await delay(200);
    if (!category) return [...products];
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
};