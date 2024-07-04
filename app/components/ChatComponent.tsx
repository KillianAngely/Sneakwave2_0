import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import useChat, { Message } from "@/hooks/useChat"; // Importer le hook useChat

const ChatComponent = () => {
  const { conversation, input, loading, sendMessage, setInput } = useChat();
  const [currentUser, setCurrentUser] = useState("Utilisateur"); // Nom de l'utilisateur actuel, peut être dynamique

  const handleSend = () => {
    if (input.trim() !== "") {
      sendMessage(input);
    }
  };

  const getMessageStyle = (message: Message) => {
    return message.user === "assistant"
      ? styles.chatbotMessage // Aligner à gauche pour le chatbot (assistant)
      : styles.userMessage; // Aligner à droite pour l'utilisateur
  };

  // Fonction pour obtenir l'heure actuelle au format HH:MM
  const getCurrentTime = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0"); // Formatage avec deux chiffres
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Formatage avec deux chiffres
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {conversation.map((msg, index) => (
          <View key={index}>
            <View style={[styles.message, getMessageStyle(msg)]}>
              <Text style={styles.messageText}>{msg.text_content}</Text>
            </View>
            <Text style={{ fontWeight: "bold", alignSelf: "flex-end" }}>
              {getDate()}
            </Text>
          </View>
        ))}
      </ScrollView>
      {loading && <Text>Envoi en cours...</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Entrez votre message..."
          style={styles.input}
        />
        <Button title="Envoyer" onPress={handleSend} disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "80%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#3EC0D2",
    color: "white",
  },
  chatbotMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F1F1",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
  },
});

export default ChatComponent;

function getDate() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0"); // Ajoute un zéro devant si nécessaire
  const minutes = now.getMinutes().toString().padStart(2, "0"); // Ajoute un zéro devant si nécessaire
  return `${hours}:${minutes}`;
}
