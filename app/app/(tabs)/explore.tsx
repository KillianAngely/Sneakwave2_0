import { ProductRepository } from "@/domain/repository/product.repository"; // Adjust the alias path as per your project setup
import { UseGetAllProduct } from "@/domain/useCases/getAllProduct"; // Adjust the alias path as per your project setup
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CardProduct from "@/components/CardProduct"; // Adjust the alias path as per your project setup
import { useState, useEffect } from "react";

const repository = new ProductRepository();

export default function Explore() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      const _products = await repository.getProducts();
      setProducts(_products);
    }
    fetch();
  }, []);

  if (!products) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Explore</Text>
      {products.map((product) => (
        <CardProduct key={product.id} article={product} onPress={() => {}} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
