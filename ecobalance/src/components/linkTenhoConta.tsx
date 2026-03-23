import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


export function LinkTenhoConta() {
    const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => console.log("Link 'Já possuo uma conta' pressionado")}>
        <Text>Já possuo uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}
