import { promises as fs } from "fs";
import { join } from "path";

interface IProductRepository {
  getProduct(id: number): Promise<any>;
  getProducts(): Promise<any[]>;
}

export class ProductRepository implements IProductRepository {
  private filePath = join(__dirname, "../../src/products.json");

  async getProduct(id: number) {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      const products = JSON.parse(data);
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
      const data = await fs.readFile(this.filePath, "utf-8");
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
