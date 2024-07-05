import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import useChat from "@/hooks/useChat";
import { Article, Message } from "../../api/entity/chat.entity";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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

  const getMessageStyle = (message: Message) => {
    return message.user === "assistant"
      ? styles.chatbotMessage
      : styles.userMessage;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {conversation.map((message: Message, index: number) => (
          <View key={index} style={getMessageStyle(message)}>
            <Text>{message.text_content}</Text>
            <Text style={styles.timestamp}>{getTime()}</Text>
          </View>
        ))}
        <View style={styles.searchBar}>
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="Entrez votre message..."
            style={styles.input}
          />
          <Pressable
            style={styles.buttonSend}
            onPress={handleSend}
            disabled={loading}
          >
            <FontAwesome size={20} name="paper-plane" color={"white"} />
          </Pressable>
        </View>
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
    borderWidth: 1,
    borderColor: "#3EC0D2",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  timestamp: {
    fontWeight: "bold",
    fontSize: 10,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#3EC0D2",
    width: "60%",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    width: "100%",
    flex: 1,
  },
  buttonSend: {
    backgroundColor: "#3EC0D2",
    width: 45,
    height: 45,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

function getTime() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
}
