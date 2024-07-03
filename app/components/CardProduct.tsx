import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TArticle } from "@/domain/entities/product.entity";

interface CardProductProps {
  article: TArticle;
  onPress: () => void;
}

const CardProduct: React.FC<CardProductProps> = ({ article, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text>{article.name}</Text>
        <Text>{article.price}</Text>
        <Text>{article.color}</Text>
        <Text>{article.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default CardProduct;
