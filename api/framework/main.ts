import express from "express";
import bodyParser from "body-parser";
import { ChatAggregateRepository } from "../respository/chat.repository";
import { OllamaGateway } from "../gateways/Ollama.gateways";
import { createChat } from "../useCases/initChat.useCases";
import { randomChat } from "../useCases/randomChat.useCases";
import { Message, Article } from "../entity/chat.entity";

const app = express();
app.use(bodyParser.json());
const port = 3000;

const repo = new ChatAggregateRepository();
const ollama = new OllamaGateway();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/initChat", async (req, res) => {
  const body = req.body;
  const article: Article = {
    name: body.name,
    price: body.price,
    color: body.color,
    image_url: body.image_url,
    description: body.description,
  };

  const input: string = body.message;
  if (!input) {
    return res.status(400).send("Invalid");
  }
  if (!article) {
    return res.status(400).send("Invalid");
  }

  await new createChat(repo, ollama, {
    async ok(response: { id: number; message: Message }) {
      res.status(200).send(JSON.stringify(response));
    },
    async invalid() {
      res.status(400).send("Invalid");
    },
  }).execute(input, article);
});

app.post("/randomChat", async (req, res) => {
  const body = req.body;

  const id = body.id;
  const message = body.text_content;

  try {
    await new randomChat(repo, ollama, {
      async ok(message: Message) {
        res.status(200).send(JSON.stringify(message));
      },
      async invalid() {
        res.status(400).send("Invalid");
      },
    }).execute(id, {
      user: "user",
      text_content: message,
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(port, async () => {
  console.log(`API is running on port : ${port} 🌎`);
});
