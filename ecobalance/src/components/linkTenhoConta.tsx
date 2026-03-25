import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/stackNavigator"

type NavigationProp = StackNavigationProp<RootStackParamList, "TelaLogin">;

export function LinkTenhoConta() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("TelaLogin")}>
        <Text>Já possuo uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}
