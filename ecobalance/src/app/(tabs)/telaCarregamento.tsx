import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaCarregamento() {
  const navigation = useNavigation();

  useEffect(() => {
    // #region Conexão Front-Back (Verificação de Sessão)
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('@EcoBalance:token');
        
        setTimeout(() => {
          if (token) {
            // Se tem token, vai direto pro app
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "MainTabs" }],
              })
            );
          } else {
            // Se não, vai pra TelaInicial
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "TelaInicial" }], 
              })
            );
          }
        }, 3000);
      } catch (error) {
        console.error("Erro ao ler token", error);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "TelaInicial" }], 
          })
        );
      }
    };

    checkLoginStatus();
    // #endregion
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