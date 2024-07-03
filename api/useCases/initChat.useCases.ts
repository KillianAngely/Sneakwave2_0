import { Artcile, Chat, Message } from "../entity/chat.entity";
import { IOllamaGateway } from "../gateways/Ollama.gateways";
import { IChatAggregateRepository } from "../respository/chat.repository";

export interface ICreateChat<OKType, ErrorType> {
  ok(response: { id: number; message: Message }): Promise<OKType>;
  invalid(): Promise<ErrorType>;
}

export class createChat<OKType, ErrorType> {
  constructor(
    private readonly repository: IChatAggregateRepository,
    private readonly gateway: IOllamaGateway,
    private readonly presenter: ICreateChat<OKType, ErrorType>
  ) {}

  async execute(input: string, article: Artcile) {
    const id = Math.floor(Math.random() * 1000);
    const chat = Chat.instantiate(id, article, [
      { user: "user", text_content: input, image_url: null },
    ]);
    await this.repository.saveChat(chat);
    const conversation = chat.toDto();
    const message_ia = await this.gateway.promptMessage(conversation);
    chat.addMessageIa(message_ia.text_content);
    await this.repository.saveChat(chat);
    return this.presenter.ok({
      id: chat.id,
      message: await this.repository.getLastMessage(id),
    });
  }
}
