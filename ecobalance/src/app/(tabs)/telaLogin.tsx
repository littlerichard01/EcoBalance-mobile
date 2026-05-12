import React, { useMemo, useState } from "react";
import { Image, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/stackNavigator"
import { BotaoEntrar } from "@/src/components/botaoEntrar";
import { styles } from "../../styles/logo";
import { stylesTelaLogin } from "../../styles/telaLoginStyles";
import { fonte } from "@/src/styles/fontes";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { LinkEsqueciSenha } from "@/src/components/linkEsqueciSenha";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../services/api";
import { SenhaRequisitosDropdown } from "@/src/components/senhaRequisitosDropdown";
import { validateStrongPassword } from "@/src/utils/passwordPolicy";

type NavigationProp = StackNavigationProp<RootStackParamList, "TelaLogin">;

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaFocada, setSenhaFocada] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const senhaForte = useMemo(() => validateStrongPassword(senha).ok, [senha]);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    // #region Conexão Front-Back (Login)
    try {
      const response = await api.post('/auth/login', {
        email,
        senha
      });

      const token = response.data.token;
      
      // Salva o token no storage
      await AsyncStorage.setItem('@EcoBalance:token', token);

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      navigation.navigate("MainTabs");
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message);
      Alert.alert("Erro", error.response?.data?.message || "E-mail ou senha incorretos.");
    }
    // #endregion
  };

  return (
    <View style={stylesTelaLogin.telaLoginContainer}>
      <Image source={require("../../assets/Logo.png")} style={styles.logo} />
      <Text style={fonte.titulo}>Seja Bem Vindo de Volta!</Text>
      <Text style={fonte.subtitulo}>Faça seu Login</Text>

      <Text style={stylesTelaLogin.inputText}>E-mail</Text>
      <TextInput
        style={stylesGeral.textInput}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={stylesTelaLogin.inputText}>Senha</Text>
      <TextInput
        style={stylesGeral.textInput}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        onFocus={() => setSenhaFocada(true)}
        onBlur={() => setSenhaFocada(false)}
      />
      <SenhaRequisitosDropdown senha={senha} visible={senhaFocada && !senhaForte} />

      <BotaoEntrar onPress={handleLogin} />

      <LinkEsqueciSenha />

      <TouchableOpacity onPress={() => navigation.navigate("TelaCadastro")} style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{textDecorationLine: 'underline', fontStyle: 'italic'}}>Ainda não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
