import { TArticle } from "@/domain/entities/product.entity";
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button, Alert } from "react-native";

export default function InputButton({ article }: { article: TArticle }) {
  const [inputText, setInputText] = useState("");

  const handleButtonPress = () => {
    // Here you can handle the inputText, for example, send it to an API or navigate to another screen
    Alert.alert(
      "Input Text",
      inputText +
        " " +
        article.color +
        " " +
        article.price +
        " " +
        article.name +
        " " +
        article.description
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.card}
        placeholder="Enter text"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send" onPress={handleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
});
