export interface IChatAggregateRepository {
  saveChat(chat: any): Promise<void>;
  getLastMessage(id: number): Promise<string>;
}

export class ChatAggregateRepository implements IChatAggregateRepository {
  async saveChat(chat: any) {
    throw new Error("Method not implemented.");
  }
  async getLastMessage(id: any) {
    return "Method not implemented.";
  }
}
