import { randomChat } from "../services/chat.services";
import { IChatAggregateRepository } from "../repository/chat.repository";

export interface IUseRandomChat<OKType, ErrorType> {
  ok(response: { message: any }): Promise<OKType>;
  invalid(): Promise<ErrorType>;
}

export class useRandomChat<OKType, ErrorType> {
  constructor(
    private readonly repository: IChatAggregateRepository,
    private readonly presenter: IUseRandomChat<OKType, ErrorType>
  ) {}

  async execute(id: number, message: any, image_url: string) {
    try {
      if (!id || !message) {
        return this.presenter.invalid();
      }

      const chat = await randomChat(id, message, image_url);
      this.repository.saveChat(chat);
      return this.presenter.ok({
        message: await this.repository.getLastMessage(id),
      });
    } catch (error) {
      return this.presenter.invalid();
    }
  }
}
