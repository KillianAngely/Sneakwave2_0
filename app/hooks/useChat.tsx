import React, { useState, useEffect } from "react";
import { Message } from "@/domain/entities/chat.entity";

type InputType = string;

const useChat = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<InputType>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Effet de nettoyage lorsque le composant est démonté (quand l'utilisateur quitte la page ou revient en arrière)
    return () => {
      setConversation([]); // Réinitialiser la conversation
      setInput(""); // Réinitialiser l'input
      setLoading(false); // Arrêter le chargement
    };
  }, []);

  const sendMessage = () => {
    setLoading(true);

    // Simuler l'envoi du message au service et la gestion de la réponse
    setTimeout(() => {
      const newMessageUser: Message = {
        user: "user",
        text_content: input,
        image_url: null,
      };

      // Simuler la réponse du chatbot
      const newMessageBot: Message = {
        user: "assistant",
        text_content: `Réponse automatique à "${input}"`,
        image_url: null,
      };

      setConversation([...conversation, newMessageUser, newMessageBot]);
      setInput(""); // Réinitialiser l'input après l'envoi du message
      setLoading(false); // Fin du chargement
    }, 1000); // Simuler un délai pour la réponse du service
  };

  return { conversation, input, loading, sendMessage, setInput };
};

export default useChat;
