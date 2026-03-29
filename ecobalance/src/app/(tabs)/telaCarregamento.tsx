import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";

export default function TelaCarregamento() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // O reset limpa a pilha para o usuário não voltar para o carregamento
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "TelaInicial" }], 
        })
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/EcoBalanceLogo.png")} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FFF0",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
});