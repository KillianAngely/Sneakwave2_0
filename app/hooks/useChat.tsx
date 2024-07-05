import React, { useState, useEffect } from "react";
import { Article, Message } from "../../api/entity/chat.entity";
import { createChat, randomChat } from "@/domain/services/chat.services";

type InputType = string;

const useChat = (product: Article) => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [id, setId] = useState<number>(0);
  const [input, setInput] = useState<InputType>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<Article | undefined>(product);
  const [timeout, setTimeoutState] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      setConversation([]);
      setId(0);
      setInput("");
      setLoading(false);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  const sendMessage = async () => {
    if (input.trim() === "" || loading) return;

    setLoading(true);

    const userMessage: Message = {
      user: "user",
      text_content: input,
    };

    setConversation((prevConversation) => [...prevConversation, userMessage]);

    setInput("");

    try {
      let botMessage: Message;

      if (id === 0) {
        const newChatMessage = await createChat(product, input);
        if (newChatMessage instanceof Error) {
          throw newChatMessage;
        }
        botMessage = {
          user: newChatMessage.message.user,
          text_content: newChatMessage.message.text_content,
        };
        setId(newChatMessage.id);
      } else {
        const randomMessage = await randomChat(id, {
          user: "user",
          text_content: input,
        });
        if (randomMessage instanceof Error) {
          throw randomMessage;
        }
        botMessage = {
          user: randomMessage.user,
          text_content: randomMessage.text_content,
        };
      }

      setConversation((prevConversation) => [...prevConversation, botMessage]);

      // const newTimeout = setTimeout(() => {
      //   setLoading(false);
      // }, 1000);
      // setTimeoutState(newTimeout);
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false); // Make sure to set loading to false on error
    }
  };

  return { conversation, input, loading, sendMessage, setInput, setArticle };
};

export default useChat;
