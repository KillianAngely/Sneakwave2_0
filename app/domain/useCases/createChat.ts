import { createChat } from "../services/chat.services";
import { IChatAggregateRepository } from "../repository/chat.repository";

interface IUseCreateChat<OKType, ErrorType> {
  ok(response: { id: number; message: string }): Promise<OKType>;
  invalid(): Promise<ErrorType>;
}

export class useCreateChat<OKType, ErrorType> {
  constructor(
    private readonly repository: IChatAggregateRepository,
    private readonly presenter: IUseCreateChat<OKType, ErrorType>
  ) {}

  async execute(article: any, message: any, image_url: string) {
    try {
      if (!article || !message) {
        return this.presenter.invalid();
      }
      const chat = await createChat(article, message, image_url);
      this.repository.saveChat(chat);
      return this.presenter.ok({
        id: chat.id,
        message: await this.repository.getLastMessage(chat.id),
      });
    } catch (error) {
      return this.presenter.invalid();
    }
  }
}
