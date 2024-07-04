import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TArticle } from "@/domain/entities/product.entity";
export default function CardProduct({ article }: { article: TArticle }) {
  return (
    <View style={styles.card}>
      <Image
        source={require("./assets/images/dn.jpeg")}
        style={styles.image}
        onError={() => {
          console.log("Image not found");
        }}
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
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
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
