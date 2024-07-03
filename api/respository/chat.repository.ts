import { Chat, Message, Artcile } from "../entity/chat.entity";

const db: Array<{
  id: number;
  artcile: Artcile;
  messages: Message[];
}> = [];

export interface IChatAggregateRepository {
  saveChat(chat: Chat): Promise<void>;
  findById(id: number): Promise<Chat>;
  getLastMessage(id: number): Promise<Message>;
}

export class ChatAggregateRepository implements IChatAggregateRepository {
  async saveChat(chat: Chat): Promise<void> {
    const c = db.findIndex((it) => it.id === chat.id);
    if (c === -1) {
      db.push(chat.toDto());
    } else {
      db[c] = chat.toDto();
    }
    console.log(db);
  }
  async findById(id: number): Promise<Chat> {
    const chat = db.find((it) => it.id === id);
    if (!chat) {
      throw new Error("Chat not found");
    }
    return Chat.instantiate(chat.id, chat.artcile, chat.messages);
  }
  async getLastMessage(id: number): Promise<Message> {
    const chat = db.find((it) => it.id === id);
    if (!chat) {
      throw new Error("Chat not found");
    }
    const chat_obj = chat.messages[chat.messages.length - 1];
    return chat_obj;
  }
}
