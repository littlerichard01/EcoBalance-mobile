import React, { useState } from "react";
import { TouchableOpacity, Image, View, Text, TextInput, Alert } from "react-native";
import { BotaoCriarConta } from "../../components/botaoCriarConta";
import { styles } from "../../styles/logo";
import { stylesTelaCadastro } from "../../styles/telaCadastroStyles";
import { useNavigation } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";
import { fonte } from "@/src/styles/fontes";
import api from "../../services/api";
import { stylesTelaLogin } from "@/src/styles/telaLoginStyles";

type NavigationProp = StackNavigationProp<RootStackParamList, "TelaCadastro">;

export default function TelaCadastro() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const navigation = useNavigation<NavigationProp>();


    const handleCadastro = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        // #region Conexão Front-Back (Cadastro)
        try {
            await api.post('/auth/register', {
                nome,
                email,
                senha
            });

            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
            navigation.navigate("TelaLogin"); // Volta para tela de login
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error.response?.data || error.message);
            Alert.alert("Erro", error.response?.data?.message || "Ocorreu um erro ao cadastrar.");
        }
        // #endregion
    };

    return (
        <View style={stylesTelaCadastro.telaCadastroContainer}>
            <Image source={require("../../assets/Logo.png")} style={styles.logo} />
            <Text style={[fonte.titulo, {fontWeight: 900, color: coresBase.verdeEscuro}]}>Seja Bem Vindo</Text>
            <Text style={[stylesGeral.subTituloPagina, {marginTop: -5}]}>Faça seu Cadastro</Text>

            <Text style={stylesTelaLogin.inputText}>Nome</Text>
            <TextInput
                style={stylesGeral.textInput}
                placeholder="Digite seu nome"
                value={nome}
                onChangeText={setNome}
            />
            <Text style={stylesTelaLogin.inputText}>Email</Text>
            <TextInput
                style={stylesGeral.textInput}
                placeholder="Digite seu email"
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
            />
            <Text style={stylesTelaLogin.inputText}>Confirme sua senha</Text>
            <TextInput
                style={stylesGeral.textInput}
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
            />

            <BotaoCriarConta onPress={handleCadastro} />

            <TouchableOpacity onPress={() => navigation.navigate("TelaLogin")} style={{ marginTop: 10 }}>
                <Text style={{textDecorationLine: 'underline', fontStyle: 'italic'}}>Já tem uma conta? Faça Login</Text>
            </TouchableOpacity>
        </View>

    );
}
