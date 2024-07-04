import React from "react";
import { Text, StyleSheet } from "react-native";

export default function TittleDisplay({
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
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: "Archivo Black",
    textAlign: "center",
  },
  tittle_notcentred: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: "Archivo Black",
  },
});
