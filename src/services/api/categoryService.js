import categoriesData from "@/services/mockData/categories.json";
import { productService } from "./productService.js";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(200);
    // Update product counts dynamically
    const products = await productService.getAll();
    const updatedCategories = categories.map(category => ({
      ...category,
      productCount: products.filter(p => p.category === category.name).length
    }));
    return updatedCategories;
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const newId = Math.max(...categories.map(c => c.Id)) + 1;
    const newCategory = {
      ...categoryData,
      Id: newId,
      productCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(250);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    const updatedCategory = {
      ...categories[index],
      ...categoryData,
      Id: parseInt(id)
    };
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    categories.splice(index, 1);
    return { success: true };
  }
};