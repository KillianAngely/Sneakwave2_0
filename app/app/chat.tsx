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

export default function ChatScreen() {
  const { image, name, price, color, description } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <TittleDisplay tittle_name="Conversation" iscentred={false} />
          <ChatComponent />
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

//   return (
//     <View style={styles.container}>
//       <Text>{image}</Text>
//       <Text>{name}</Text>
//       <Text>{price}</Text>
//       <Text>{color}</Text>
//       <Text>{description}</Text>
//       <Text>Is ready to chat</Text>
//       <InputButtonComponent
//         article={{
//           id: 0 as number,
//           name: name as string,
//           price: Number(price),
//           color: color as string,
//           description: description as string,
//           image: image as string,
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
// });
