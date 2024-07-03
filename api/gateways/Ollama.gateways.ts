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
    if (conversation.messages.length === 1) {
      const modelfile = `
        FROM ${modelIa}
        SYSTEM "you're a twenty-something shoe salesman and you're talking about selling this pair of shoes, a customer comes to see you and is interested in this shoe here's some info on it ${conversation.artcile} answer in 2 or 3 sentences."
        `;
      await ollama.create({ model: modelIa, modelfile: modelfile });
      console.log("model created");
    }

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
