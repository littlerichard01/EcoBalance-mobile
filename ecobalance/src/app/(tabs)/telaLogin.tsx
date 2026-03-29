import React, { useState } from "react";
import { Image, Button, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/stackNavigator"
import { BotaoEntrar } from "@/src/components/botaoEntrar";
import { styles } from "../../styles/logo";
import { stylesTelaLogin } from "../../styles/telaLoginStyles";
import { fonte } from "@/src/styles/fontes";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { LinkEsqueciSenha } from "@/src/components/linkEsqueciSenha";


type NavigationProp = StackNavigationProp<RootStackParamList, "MainTabs">;

export default function TelaLogin() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<NavigationProp>();


  const handleLogin = () => {
    navigation.navigate("MainTabs");
    console.log("Usuário logado com sucesso!");
  };

  return (
    <View style={stylesTelaLogin.telaLoginContainer}>
      <Image source={require("../../assets/Logo.png")} style={styles.logo} />
      <Text style={fonte.titulo}>Seja Bem Vindo de Volta!</Text>
      <Text style={fonte.subtitulo}>Faça seu Login</Text>

      <Text>E-mail</Text>
      <TextInput
        style={stylesGeral.textInput}
        placeholder="Digite seu e-mail"
        value={usuario}
        onChangeText={setUsuario}
      />
      <Text>Senha</Text>
      <TextInput
        style={stylesGeral.textInput}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <BotaoEntrar onPress={handleLogin} />

      <LinkEsqueciSenha />
    </View>
  );
}
