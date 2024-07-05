import { Message, Chat } from "../entity/chat.entity";
import { IChatAggregateRepository } from "../respository/chat.repository";
import { IOllamaGateway } from "../gateways/Ollama.gateways";

export interface IrandomChat<OKType, ErrorType> {
  ok(message: Message): Promise<OKType>;
  invalid(): Promise<ErrorType>;
}

export class randomChat<OKType, ErrorType> {
  constructor(
    private readonly repository: IChatAggregateRepository,
    private readonly gateway: IOllamaGateway,
    private readonly presenter: IrandomChat<OKType, ErrorType>
  ) {}

  async execute(id: number, message: Message) {
    try {
      const chat = await this.repository.findById(id);
      chat.addMessageUser(message);
      await this.repository.saveChat(chat);
      const conversation = chat.toDto();
      console.log(conversation.messages);
      const message_ia = await this.gateway.promptMessage(conversation);
      chat.addMessageIa(message_ia.text_content);
      await this.repository.saveChat(chat);
      return this.presenter.ok(message_ia);
    } catch (error) {
      return this.presenter.invalid();
    }
  }
}
