import React, { useState } from "react";
import { TouchableOpacity, Image, View, Text, TextInput } from "react-native";
import { BotaoCriarConta } from "../../components/botaoCriarConta";
import { styles } from "../../styles/logo";
import { stylesTelaCadastro } from "../../styles/telaCadastroStyles";
import { useNavigation } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { fonte } from "@/src/styles/fontes";


type NavigationProp = StackNavigationProp<RootStackParamList, "MainTabs">;

export default function TelaCadastro() {

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation<NavigationProp>();


    const handleLogin = () => {
        navigation.navigate("MainTabs");
        console.log("Usuário cadastrado com sucesso!");
    };

    return (
        <View style={stylesTelaCadastro.telaCadastroContainer}>
            <Image source={require("../../assets/Logo.png")} style={styles.logo} />
            <Text style={fonte.titulo}>Seja Bem Vindo</Text>
            <Text style={fonte.subtitulo}>Faça seu Cadastro</Text>

            <Text>Nome</Text>
            <TextInput
                style={stylesGeral.textInput}
                placeholder="Digite seu e-mail"
                value={usuario}
                onChangeText={setUsuario}
            />
            <Text>Email</Text>
            <TextInput
                style={stylesGeral.textInput}
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
            />
            <Text>Senha</Text>
            <TextInput
            style={stylesGeral.textInput}
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <Text>Confirme sua senha</Text>
            <TextInput
            style={stylesGeral.textInput}
                placeholder="Confirme sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <BotaoCriarConta onPress={handleLogin} />

            <TouchableOpacity onPress={() => navigation.navigate("TelaEsqueciSenha")}>
                <Text>Esqueci minha senha</Text>
            </TouchableOpacity>
        </View>

    );
}
