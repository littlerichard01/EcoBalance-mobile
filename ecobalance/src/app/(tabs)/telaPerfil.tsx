import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { BotaoSair } from "../../components/botaoSair";
import { stylesTelaPerfil } from "../../styles/telaPerfilStyles";
import { fonte } from "@/src/styles/fontes";
import { stylesGeral } from "@/src/styles/stylesGeral";


export default function TelaPerfil() {

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    return (
        <View style={stylesTelaPerfil.container}>
            <Text style={fonte.titulo}>Perfil</Text>

            <Text>Nome</Text>
            <TextInput
                style={stylesGeral.textInput}
                placeholder="Digite seu nome"
                value={usuario}
                onChangeText={setUsuario}
            />
            <Text>E-mail</Text>
            <TextInput
                style={stylesGeral.textInput}
                placeholder="Digite seu e-mail"
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
            <View>
                <Text>Notificações por e-mail?</Text>
                <Text>Notificações do aplicativo?</Text>
            </View>
            <BotaoSair onPress={console.log} />

        </View>
    );
}   
