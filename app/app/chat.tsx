import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import InputButtonComponent from "@/components/InputButton";

export default function ChatScreen() {
  const { image, name, price, color, description } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>{image}</Text>
      <Text>{name}</Text>
      <Text>{price}</Text>
      <Text>{color}</Text>
      <Text>{description}</Text>
      <Text>Is ready to chat</Text>
      <InputButtonComponent
        article={{
          id: 0 as number,
          name: name as string,
          price: Number(price),
          color: color as string,
          description: description as string,
          image: image as string,
        }}
      />
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
});
