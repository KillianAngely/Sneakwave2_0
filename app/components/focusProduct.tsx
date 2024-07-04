import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { TArticle } from "@/domain/entities/product.entity";
import { Link, router } from "expo-router";
import SubTittleDisplay from "./SubTittleDisplay";
import { FlatList } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function FocusProduct({ article }: { article: TArticle }) {
  const [quantity, setQuantity] = useState(1);

  const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <Image
            source={require("./assets/images/your-image.jpg")}
            style={styles.image}
          />
          <View style={styles.containerChatBot}>
            <Text style={styles.subtittleChatBot}>Chatbot AI</Text>
            <Pressable
              style={styles.buttonChatBot}
              onPress={() =>
                router.push({
                  pathname: "/chat",
                  params: {
                    image: article.image,
                    name: article.name,
                    price: article.price,
                    color: article.color,
                    description: article.description,
                  },
                })
              }
            >
              <Text style={styles.textChatBotAI}>
                Demandez-moi des détails ...
              </Text>
            </Pressable>
          </View>
          <SubTittleDisplay
            tittle_name="Sélectionnez une taille"
            iscentred={false}
          />
          <View style={styles.pickerContainer}>
            <FlatList
              data={sizes}
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable style={styles.pickerSize}>
                  <Text>{item}</Text>
                </Pressable>
              )}
              contentContainerStyle={styles.flatList}
            />
          </View>
          <View>
            <SubTittleDisplay tittle_name="Quantité" iscentred={false} />
            <View style={styles.quantityContainer}>
              <Button
                title="-"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              />
              <Text style={styles.quantityText}>{quantity}</Text>
              <Button title="+" onPress={() => setQuantity(quantity + 1)} />
            </View>
          </View>
          <SubTittleDisplay tittle_name="Informations" iscentred={false} />
          <View style={styles.articleDescriptionBox}>
            <Text style={{ fontWeight: "bold" }}>Prix</Text>
            <Text style={{ paddingBottom: 8, paddingTop: 2 }}>
              {article.price} €
            </Text>
            <Text style={{ fontWeight: "bold" }}>Couleur</Text>
            <Text style={{ paddingTop: 2 }}>{article.color}</Text>
          </View>
          <View>
            <SubTittleDisplay tittle_name="Description" iscentred={false} />
            <Text style={{ paddingTop: 10, color: "#808080" }}>
              {article.description}
            </Text>
          </View>
        </ScrollView>
        <Pressable
          style={styles.buttonAddcart}
          onPress={() => alert(article.name + " a été ajouté au panier!")}
        >
          <Text style={{ color: "black", textAlign: "center" }}>
            Ajouter au panier
          </Text>
        </Pressable>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  container: {
    flex: 1,
  },
  containerChatBot: {
    borderWidth: 1,
    borderColor: "#3EC0D2",
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  subtittleChatBot: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "Archivo Black",
    paddingBottom: 10,
  },
  buttonChatBot: {
    backgroundColor: "#3EC0D2",
    padding: 10,
    borderRadius: 10,
  },
  textChatBotAI: {
    fontSize: 14,
    color: "white",
    padding: 5,
  },
  articleDescriptionBox: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  articleDescription: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "Inter",
  },
  image: {
    marginTop: 20,
    objectFit: "cover",
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  buttonAddcart: {
    backgroundColor: "#3EC0D2",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  pickerContainer: {
    borderColor: "#ccc",
    overflow: "hidden",
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  pickerSize: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderColor: "#808080",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  flatList: {
    marginTop: 10,
    marginBottom: 20,
  },
});
function createStackNavigator() {
  throw new Error("Function not implemented.");
}
