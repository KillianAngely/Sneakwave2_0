import { randomChat } from "../useCases/randomChat.useCases";
import { ChatAggregateRepository } from "../respository/chat.repository";
import { OllamaGateway } from "../gateways/Ollama.gateways";
import exp from "constants";

const repo = new ChatAggregateRepository();
const ollama = new OllamaGateway();

describe("test if i can chat with ollama", () => {
  it("should be init a chat and return a message", async () => {
    const response = await new randomChat(repo, ollama, {
      async ok(message) {
        return message;
      },
      async invalid() {
        return "Invalid";
      },
    }).execute(1, {
      user: "user",
      text_content: "hello",
      image_url: null,
    });
    expect(response).toHaveProperty("user");
    expect(response).toHaveProperty("text_content");
  });
});
