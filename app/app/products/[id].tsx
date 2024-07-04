import { ProductRepository } from "@/domain/repository/product.repository";
import { Link, useLocalSearchParams } from "expo-router";
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
import { useEffect, useState } from "react";
import FocusProduct from "@/components/FocusProduct";
import SubTittleDisplay from "@/components/SubTittleDisplay";
import TittleDisplay from "@/components/TitleDisplay";

const repository = new ProductRepository();
export default function PageOneArticle() {
  const { id_product } = useLocalSearchParams();

  const idProductNumber = Number(id_product);
  if (isNaN(idProductNumber)) {
    return <Text>Invalid product ID</Text>;
  }
  const [article, setArticle] = useState<any>([]);
  useEffect(() => {
    async function fetch() {
      const _article = await repository.getProduct(idProductNumber);
      setArticle(_article);
    }
    fetch();
  }, [idProductNumber]);

  if (!article) {
    return <Text>Oups .</Text>;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <TittleDisplay tittle_name={article.name} iscentred={true} />
          <FocusProduct article={article} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});
