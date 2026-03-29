import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/stackNavigator"
import { fonte } from "../styles/fontes";
import { stylesTelaLogin } from "../styles/telaLoginStyles";

type NavigationProp = StackNavigationProp<RootStackParamList, "TelaLogin">;

export function LinkEsqueciSenha() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("TelaEsqueciSenha")}>
        <Text style={stylesTelaLogin.linkEsqueciSenha}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}
