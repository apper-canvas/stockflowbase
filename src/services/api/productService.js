const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'product';

export const productService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "sku" } },
          { field: { Name: "price" } },
          { field: { Name: "quantity" } },
          { field: { Name: "low_stock_threshold" } },
          { field: { Name: "last_updated" } },
          { field: { Name: "category" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "sku" } },
          { field: { Name: "price" } },
          { field: { Name: "quantity" } },
          { field: { Name: "low_stock_threshold" } },
          { field: { Name: "last_updated" } },
          { field: { Name: "category" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching product with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async create(productData) {
    try {
      const params = {
        records: [{
          Name: productData.name,
          sku: productData.sku,
          price: parseFloat(productData.price),
          quantity: parseInt(productData.quantity),
          low_stock_threshold: parseInt(productData.lowStockThreshold),
          category: parseInt(productData.category) || productData.category,
          last_updated: new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create products ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0]?.message || 'Failed to create product');
        }

        return response.results[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating product:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, productData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: productData.name,
          sku: productData.sku,
          price: parseFloat(productData.price),
          quantity: parseInt(productData.quantity),
          low_stock_threshold: parseInt(productData.lowStockThreshold),
          category: parseInt(productData.category) || productData.category,
          last_updated: new Date().toISOString()
        }]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update products ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0]?.message || 'Failed to update product');
        }

        return response.results[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating product:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete products ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0]?.message || 'Failed to delete product');
        }

        return { success: true };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting product:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async adjustStock(id, adjustment) {
    try {
      // First get current product data
      const currentProduct = await this.getById(id);
      const newQuantity = Math.max(0, currentProduct.quantity + adjustment.quantity);
      
      const params = {
        records: [{
          Id: parseInt(id),
          quantity: newQuantity,
          last_updated: new Date().toISOString()
        }]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to adjust stock ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0]?.message || 'Failed to adjust stock');
        }

        return response.results[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error adjusting stock:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getLowStockProducts() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "sku" } },
          { field: { Name: "price" } },
          { field: { Name: "quantity" } },
          { field: { Name: "low_stock_threshold" } },
          { field: { Name: "last_updated" } },
          { field: { Name: "category" } }
        ],
        whereGroups: [
          {
            operator: "AND",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "quantity",
                    operator: "LessThanOrEqualTo",
                    values: ["low_stock_threshold"]
                  }
                ]
              }
            ]
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Failed to get low stock products:", error);
      return [];
    }
  },

  async searchProducts(query) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "sku" } },
          { field: { Name: "price" } },
          { field: { Name: "quantity" } },
          { field: { Name: "low_stock_threshold" } },
          { field: { Name: "last_updated" } },
          { field: { Name: "category" } }
        ],
        where: [
          {
            FieldName: "Name",
            Operator: "Contains",
            Values: [query]
          },
          {
            FieldName: "sku", 
            Operator: "Contains",
            Values: [query]
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  },

  async getByCategory(category) {
    try {
      if (!category) {
        return await this.getAll();
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "sku" } },
          { field: { Name: "price" } },
          { field: { Name: "quantity" } },
          { field: { Name: "low_stock_threshold" } },
          { field: { Name: "last_updated" } },
          { field: { Name: "category" } }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error filtering products by category:", error);
      return [];
    }
  }
};