import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TArticle } from "@/domain/entities/product.entity";

export default function CardProduct({ article }: { article: TArticle }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: article.image }}
        style={styles.image} // Appliquer le style à l'image
        onError={() => console.log("Failed to load image")}
      />
      <Text>{article.name}</Text>
      <View style={styles.inline}>
        <Text>A partir de </Text>
        <View>
          <Text style={styles.price}>{article.price}€</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 8,
    height: 200,
    padding: 10,
    marginRight: 10,
    alignItems: "center", // Centrer le contenu horizontalement
    justifyContent: "center", // Centrer le contenu verticalement
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain", // Assurer que l'image reste dans ses dimensions
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  price: {
    fontWeight: "bold",
  },
});
