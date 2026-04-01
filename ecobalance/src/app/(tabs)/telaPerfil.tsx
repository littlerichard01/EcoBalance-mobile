import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { BotaoSair } from "../../components/botaoSair";
import { stylesTelaPerfil } from "../../styles/telaPerfilStyles";
import { fonte } from "@/src/styles/fontes";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { Switch, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from "react-native";

export default function TelaPerfil() {

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isEnabledEmail, setIsEnabledEmail] = useState(false);
    const [isEnabledApp, setIsEnabledApp] = useState(false);
    const toggleSwitchEmail = () => setIsEnabledEmail(previousState => !previousState);
    const toggleSwitchApp = () => setIsEnabledApp(previousState => !previousState);


    return (
        <View style={stylesTelaPerfil.container}>
            <View>
            <Image source={require("../../assets/engrenagem.png")}/>
            <Text style={fonte.titulo}>Perfil</Text>
            </View>
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
                <Switch
                    onValueChange={toggleSwitchEmail}
                    value={isEnabledEmail}
                />
            </View>
            <View>
                <Text>Notificações do aplicativo?</Text>
                <Switch
                    onValueChange={toggleSwitchApp}
                    value={isEnabledApp}
                />
            </View>
            <BotaoSair onPress={console.log} />

        </View>
    );
}   
