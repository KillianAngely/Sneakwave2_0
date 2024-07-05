import { Article, Message } from "../../../api/entity/chat.entity";

export async function createChat(article: Article, messages: string) {
  try {
    const response = await fetch("http://localhost:3000/initChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: article.name,
        price: article.price,
        color: article.color,
        description: article.description,
        image_url: article.image_url,
        message: messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in createChat:", error);
    return error;
  }
}

export async function randomChat(id: number, messages: Message) {
  try {
    const response = await fetch("http://localhost:3000/randomChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        messages: messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in randomChat:", error);
    return error;
  }
}
