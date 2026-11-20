import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const pokeAPI = "https://pokeapi.co/api/v2/pokemon?limit=67";

interface Pokemon {
  name: string;
  image: string;
  imageShiny: string;
  type: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export default function Index() {
  useEffect(() => {
    fetchPokemons();
  }, []);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  async function fetchPokemons() {
    try {
      const response = await fetch(pokeAPI);
      const data = await response.json();
      const detailPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageShiny: details.sprites.front_shiny,
            type: details.types,
          };
        }),
      );

      setPokemons(detailPokemons);
      console.log(JSON.stringify(detailPokemons, null, 2));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
        }}
      >
        {pokemons.map((pokemon: Pokemon) => (
          <Link
            href={{
              pathname: "/details",
              params: {
                name: pokemon.name,
                type: pokemon.type[0].type.name,
                color: colorsByType[pokemon.type[0].type.name] + 50,
                image: pokemon.image,
              },
            }}
            key={pokemon.name}
            style={{
              backgroundColor: colorsByType[pokemon.type[0].type.name] + 50,
              padding: 20,
              borderRadius: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{pokemon.name}</Text>
              <Text style={styles.tag}>{pokemon.type[0].type.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Image
                  source={{ uri: pokemon.image }}
                  style={{ width: 150, height: 150 }}
                ></Image>
                <Image
                  source={{ uri: pokemon.imageShiny }}
                  style={{ width: 150, height: 150 }}
                ></Image>
              </View>
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
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
