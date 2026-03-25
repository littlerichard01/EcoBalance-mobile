import React, { useState } from "react";
import { Button, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/stackNavigator"

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function TelaLogin() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<NavigationProp>();


  const handleLogin = () => {
    navigation.navigate("Home");
    console.log("Usuário logado com sucesso!");
  };

  return (
    <View>
      <Text>Login</Text>

      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />
      
      <TouchableOpacity onPress={() => navigation.navigate("TelaEsqueciSenha")}>
              <Text>Esqueci minha senha</Text>
            </TouchableOpacity>
    </View>
  );
}
