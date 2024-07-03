// init a chat with api
export async function createChat(article: any, messages: any, image_url: any) {
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
        messages: messages,
        image_url: image_url,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

// random chat with api

export async function randomChat(id: any, messages: any, image_url: any) {
  try {
    const response = await fetch("http://localhost:3000/randomChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        messages: messages,
        image_url: image_url,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
