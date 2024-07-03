import RNFS from "react-native-fs";
export interface IProductRepository {
  getProduct(id: number): Promise<any>;
  getProducts(): Promise<any[]>;
}

export class ProductRepository implements IProductRepository {
  private filePath =
    RNFS.DocumentDirectoryPath + "../../assets/db/products.json";

  async getProduct(id: number) {
    try {
      const data = await RNFS.readFile(this.filePath, "utf-8");
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
      const data = await RNFS.readFile(this.filePath, "utf-8");
      const products: any[] = JSON.parse(data);
      return products;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

// Test the code
const repository = new ProductRepository();
repository
  .getProduct(1)
  .then((product) => console.log(product))
  .catch((error) => console.error(error));
repository
  .getProducts()
  .then((products) => console.log(products))
  .catch((error) => console.error(error));
