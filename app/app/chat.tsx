import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import InputButtonComponent from "@/components/InputButton";
import {
  FlatList,
  ScrollView,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import TittleDisplay from "@/components/TitleDisplay";
import ChatComponent from "@/components/ChatComponent";
import { Article } from "../../api/entity/chat.entity";

export default function ChatScreen() {
  const { image, name, price, color, description } = useLocalSearchParams();

  const productFocused: Article = {
    image_url: image as string,
    name: name as string,
    price: Number(price),
    color: color as string,
    description: description as string,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <TittleDisplay tittle_name="Conversation" iscentred={false} />
          <ChatComponent article_focused={productFocused} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});
