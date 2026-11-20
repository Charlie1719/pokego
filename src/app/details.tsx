import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: params.color }}>
      <Text style={styles.name}>{params.name}</Text>
      <Text style={styles.tag}>{params.type}</Text>
      <Image source={params.image} style={{ width: 400, height: 400 }}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  tag: {
    fontSize: 28,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
});
