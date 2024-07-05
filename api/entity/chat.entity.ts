export type Article = {
  name: string;
  price: number;
  color: string;
  description: string;
  image_url: string | null;
};

export type Message = {
  user: "user" | "assistant";
  text_content: string;
};

export type ThreadConversation = {
  id: number;
  artcile: Article;
  messages: Message[];
};

export class Chat {
  static instantiate(id: number, artcile: Article, messages: Message[]) {
    return new Chat(id, artcile, messages);
  }

  constructor(
    public id: number,
    public artcile: Article,
    public messages: Message[]
  ) {}

  addMessageUser(message: Message) {
    const chatMessage: Message = {
      user: "user",
      text_content: message.text_content,
    };
    this.messages.push(chatMessage);
  }

  addMessageIa(message: string) {
    const chatMessage: Message = {
      user: "assistant",
      text_content: message,
    };
    this.messages.push(chatMessage);
  }

  toDto() {
    const conv: ThreadConversation = {
      id: this.id,
      artcile: this.artcile,

      messages: this.messages.map(({ user, text_content }) => ({
        user,
        text_content,
      })),
    };
    return conv;
  }
}
