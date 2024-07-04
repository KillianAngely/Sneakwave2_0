import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import SubTittleDisplay from "./SubTittleDisplay";

export default function LabelPresenter({
  tittle_section,
}: {
  tittle_section: string;
}) {
  return (
    <View style={styles.container}>
      <SubTittleDisplay
        tittle_name={tittle_section}
        iscentred={false}
      ></SubTittleDisplay>
      <Pressable>
        <Text style={styles.link}>Voir tout</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 20,
  },
  link: {
    color: "#3EC0D2",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter",
  },
});
