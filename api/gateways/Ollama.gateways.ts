import { Ollama } from "ollama";
import { Message, ThreadConversation } from "../entity/chat.entity";

export interface IOllamaGateway {
  promptMessage(conversation: ThreadConversation): Promise<Message>;
}

const ollama = new Ollama({ host: "http://ollama:11434" });
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

    const modelfile = `
        FROM ${modelIa}
        SYSTEM "tu est un vendeur de chaussure d'une vingtaine d'année et tu dois vendre cette paire de chaussure , un client vien te voir est interssé par cette chaussure  voici des info sur celle ci ${conversation.artcile} , repond avec des phrases courtes en 2 ou 3 "
        `;
    await ollama.create({ model: modelIa, modelfile: modelfile });
    console.log("model created");
    const response = await ollama.chat({
      model: modelIa,
      messages: prompt,
    });
    console.log("response");
    console.log(response);
    const Iamessage: Message = {
      user: "assistant",
      text_content: response.message.content,
      image_url: null,
    };
    return Iamessage;
  }
}
