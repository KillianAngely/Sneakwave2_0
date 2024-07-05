import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
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

  const getMessageStyle = (message: any) => {
    console.log(message);
    if (message.user) {
      return message.user === "assistant"
        ? styles.chatbotMessage
        : styles.userMessage;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {conversation.map((message: Message, index: number) => (
          <View key={index} style={getMessageStyle(message)}>
            <Text>{message.text_content}</Text>
          </View>
        ))}
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Entrez votre message..."
        />
        <Button title="Envoyer" onPress={handleSend} disabled={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  chatbotMessage: {
    backgroundColor: "#3EC0D2",
    color: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  userMessage: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});
