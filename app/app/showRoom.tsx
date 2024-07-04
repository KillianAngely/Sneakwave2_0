import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import CardProduct from "@/components/CardProduct";
import LabelPresenter from "@/components/LabelPresenter";
import TittleDisplay from "@/components/TitleDisplay";
import { ProductRepository } from "@/domain/repository/product.repository";
import Icon from "react-native-vector-icons/Ionicons"; // Importer l'icône
import { FontAwesome } from "@expo/vector-icons";

const repository = new ProductRepository();

export default function ListProduct() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const _products = await repository.getProducts();
      setProducts(_products);
    }
    fetchProducts();
  }, []);

  const handleSearch = () => {
    // Ajoutez votre logique de recherche ici
    console.log("Searching for:", searchQuery);
  };

  if (!products || products.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TittleDisplay tittle_name="Accueil" iscentred={false} />
        <View style={styles.innerContainer}>
          <Text>Showroom</Text>
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
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
