import * as FileSystem from "expo-file-system";
import products from "../../assets/products.json";

export interface IProductRepository {
  getProduct(id: number): Promise<any>;
  getProducts(): Promise<any[]>;
}

export class ProductRepository implements IProductRepository {
  async getProduct(id: number) {
    try {
      const product = products.find((product: any) => product.id === id);
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      return products;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
