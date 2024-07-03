import { IProductRepository } from "../repository/product.repository";

export interface IUseGetAllProduct<OKType, ErrorType> {
  ok(products: any[]): Promise<OKType>;
  invalid(): Promise<ErrorType>;
}

export class UseGetAllProduct<OKType, ErrorType> {
  constructor(
    private readonly presenter: IUseGetAllProduct<OKType, ErrorType>,
    private readonly repository: IProductRepository
  ) {}

  async execute(id: number) {
    try {
      const products = await this.repository.getProduct(id);
      return this.presenter.ok(products);
    } catch (error) {
      return this.presenter.invalid();
    }
  }
}
