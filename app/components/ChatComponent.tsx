import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import useChat from "@/hooks/useChat";
import { Article, Message } from "../../api/entity/chat.entity";

const ChatComponent = ({ article_focused }: { article_focused: Article }) => {
  const { conversation, input, loading, sendMessage, setInput, setArticle } =
    useChat(article_focused);

  useEffect(() => {
    setArticle(article_focused);
  }, [article_focused]);

  const handleSend = async () => {
    if (input.trim() !== "") {
      setInput(input);
      await sendMessage();
    }
  };

  return (
    <View>
      <TextInput
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder="Entrez votre message..."
      />
      <Button title="Envoyer" onPress={handleSend} disabled={loading} />
    </View>
  );
};

export default ChatComponent;
