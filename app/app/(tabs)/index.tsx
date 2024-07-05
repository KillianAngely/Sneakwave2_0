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
    alert("filtre produit");
  };

  if (!products || products.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TittleDisplay tittle_name="Accueil" iscentred={false} />
        <View style={styles.innerContainer}>
          <View style={styles.searchContainer}>
            <View style={styles.inputWrapper}>
              <View style={styles.iconWrapper}>
                <Icon name="search" size={20} color="#808080" />
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher une paire, une marque ..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <Pressable style={styles.searchButton} onPress={handleSearch}>
              <FontAwesome name="sliders" size={20} color="#808080" />
            </Pressable>
          </View>
          <LabelPresenter tittle_section="Nouveautés" />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={products.sort((a, b) => b.id - a.id).slice(0, 20)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: `../products/[id]`,
                  params: { id_product: item.id },
                }}
              >
                <CardProduct article={item} />
              </Link>
            )}
            contentContainerStyle={styles.flatList}
          />
          <LabelPresenter tittle_section="Les plus populaires" />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: `../products/[id]`,
                  params: { id_product: item.id },
                }}
              >
                <CardProduct article={item} />
              </Link>
            )}
            contentContainerStyle={styles.flatList}
          />
          <LabelPresenter tittle_section="Nos coups de coeurs" />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={products.sort((a, b) => a.price - b.price).slice(0, 5)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: `../products/[id]`,
                  params: { id_product: item.id },
                }}
              >
                <CardProduct article={item} />
              </Link>
            )}
            contentContainerStyle={styles.flatList}
          />
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
  searchContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  iconWrapper: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 50,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#808080",
  },
  searchButton: {
    borderColor: "#808080",
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  flatList: {
    marginTop: 10,
    marginBottom: 20,
  },
});
