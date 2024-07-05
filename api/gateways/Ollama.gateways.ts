import { Ollama } from "ollama";
import { Message, ThreadConversation } from "../entity/chat.entity";

export interface IOllamaGateway {
  promptMessage(conversation: ThreadConversation): Promise<Message>;
}

const ollama = new Ollama({
  host: "http://192.168.1.28:11434",
});
export class OllamaGateway implements IOllamaGateway {
  async promptMessage(conversation: ThreadConversation): Promise<Message> {
    let modelIa: string = "llama3";
    let prompt: any;
    if (!conversation.messages[conversation.messages.length - 1].image_url) {
      prompt = [
        {
          role: "user",
          messages: conversation.messages.map((msg) => ({
            user: msg.user,
            content: msg.text_content,
            image_url: msg.image_url,
          })),
        },
      ];
    } else {
      modelIa = "llava";
      prompt = [
        {
          role: "user",
          messages: conversation.messages.map((msg) => ({
            user: msg.user,
            content: msg.text_content,
            image_url: msg.image_url,
          })),
          image:
            conversation.messages[conversation.messages.length - 1].image_url,
        },
      ];
    }
    if (conversation.messages.length === 1) {
      const modelfile = `
        FROM ${modelIa}
        SYSTEM "tu est un vendeur de chaussures d'une vingtaine d'années et vous parlez de vendre cette paire de chaussures, un client vient vous voir et s'intéresse à cette chaussure voici quelques informations sur elle ${conversation.artcile} répondez en 2 ou 3 phrases."
        `;
      await ollama.create({ model: modelIa, modelfile: modelfile });
    }

    const response = await ollama.chat({
      model: modelIa,
      messages: prompt,
    });
    console.log(response);
    const Iamessage: Message = {
      user: "assistant",
      text_content: response.message.content,
      image_url: null,
    };
    return Iamessage;
  }
}
