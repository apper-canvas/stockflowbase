const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'stock_adjustment';

export const stockAdjustmentService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "product_id" } },
          { field: { Name: "type" } },
          { field: { Name: "quantity" } },
          { field: { Name: "reason" } },
          { field: { Name: "timestamp" } }
        ],
        orderBy: [
          {
            fieldName: "timestamp",
            sorttype: "DESC"
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
        console.error("Error fetching stock adjustments:", error?.response?.data?.message);
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
          { field: { Name: "product_id" } },
          { field: { Name: "type" } },
          { field: { Name: "quantity" } },
          { field: { Name: "reason" } },
          { field: { Name: "timestamp" } }
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
        console.error(`Error fetching stock adjustment with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getByProductId(productId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "product_id" } },
          { field: { Name: "type" } },
          { field: { Name: "quantity" } },
          { field: { Name: "reason" } },
          { field: { Name: "timestamp" } }
        ],
        where: [
          {
            FieldName: "product_id",
            Operator: "EqualTo",
            Values: [parseInt(productId)]
          }
        ],
        orderBy: [
          {
            fieldName: "timestamp",
            sorttype: "DESC"
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
      console.error("Error fetching stock adjustments by product ID:", error);
      return [];
    }
  },

  async create(adjustmentData) {
    try {
      const params = {
        records: [{
          Name: adjustmentData.Name || `${adjustmentData.type} - ${new Date().toLocaleDateString()}`,
          product_id: parseInt(adjustmentData.productId),
          type: adjustmentData.type,
          quantity: parseInt(adjustmentData.quantity),
          reason: adjustmentData.reason,
          timestamp: new Date().toISOString()
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
          console.error(`Failed to create stock adjustments ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0]?.message || 'Failed to create stock adjustment');
        }

        return response.results[0].data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating stock adjustment:", error?.response?.data?.message);
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
          console.error(`Failed to delete stock adjustments ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0]?.message || 'Failed to delete stock adjustment');
        }

        return { success: true };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting stock adjustment:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
}
};