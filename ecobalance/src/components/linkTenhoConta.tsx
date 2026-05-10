import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/stackNavigator"
import { stylesTelaInicial } from "../styles/telaInicialStyles";

type NavigationProp = StackNavigationProp<RootStackParamList, "TelaLogin">;

export function LinkTenhoConta() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("TelaLogin")}>
        <Text style={stylesTelaInicial.linkTenhoConta}>Já possuo uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}
