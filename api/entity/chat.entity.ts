export type Artcile = {
  name: string;
  price: number;
  color: string;
  description: string;
};

export type Message = {
  user: "user" | "assistant";
  text_content: string;
  image_url: string | null;
};

export type ThreadConversation = {
  id: number;
  artcile: Artcile;
  messages: Message[];
};

export class Chat {
  static instantiate(id: number, artcile: Artcile, messages: Message[]) {
    return new Chat(id, artcile, messages);
  }

  constructor(
    public id: number,
    public artcile: Artcile,
    public messages: Message[]
  ) {}

  addMessageUser(message: Message) {
    const chatMessage: Message = {
      user: "user",
      text_content: message.text_content,
      image_url: message.image_url,
    };
    this.messages.push(chatMessage);
  }

  addMessageIa(message: string) {
    const chatMessage: Message = {
      user: "assistant",
      text_content: message,
      image_url: null,
    };
    this.messages.push(chatMessage);
  }

  toDto() {
    const conv: ThreadConversation = {
      id: this.id,
      artcile: this.artcile,

      messages: this.messages.map(({ user, text_content, image_url }) => ({
        user,
        text_content,
        image_url,
      })),
    };
    return conv;
  }
}
