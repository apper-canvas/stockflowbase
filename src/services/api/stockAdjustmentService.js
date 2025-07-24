import stockAdjustmentsData from "@/services/mockData/stockAdjustments.json";

let stockAdjustments = [...stockAdjustmentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const stockAdjustmentService = {
  async getAll() {
    await delay(250);
    return [...stockAdjustments].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
  },

  async getById(id) {
    await delay(150);
    const adjustment = stockAdjustments.find(s => s.Id === parseInt(id));
    if (!adjustment) {
      throw new Error("Stock adjustment not found");
    }
    return { ...adjustment };
  },

  async getByProductId(productId) {
    await delay(200);
    return stockAdjustments
      .filter(s => s.productId === parseInt(productId))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async create(adjustmentData) {
    await delay(300);
    const newId = Math.max(...stockAdjustments.map(s => s.Id)) + 1;
    const newAdjustment = {
      ...adjustmentData,
      Id: newId,
      timestamp: new Date().toISOString()
    };
    stockAdjustments.push(newAdjustment);
    return { ...newAdjustment };
  },

  async delete(id) {
    await delay(200);
    const index = stockAdjustments.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Stock adjustment not found");
    }
    stockAdjustments.splice(index, 1);
    return { success: true };
  }
};