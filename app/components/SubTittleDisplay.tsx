import React from "react";
import { Text, StyleSheet } from "react-native";

export default function SubTittleDisplay({
  tittle_name,
  iscentred,
}: {
  tittle_name: string;
  iscentred: boolean;
}) {
  if (iscentred) {
    return <Text style={styles.tittle_centred}>{tittle_name}</Text>;
  } else {
    return <Text style={styles.tittle_notcentred}>{tittle_name}</Text>;
  }
}

const styles = StyleSheet.create({
  tittle_centred: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24,
    fontFamily: "Archivo Black",
    textAlign: "center",
  },
  tittle_notcentred: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24,
    fontFamily: "Archivo Black",
  },
});
