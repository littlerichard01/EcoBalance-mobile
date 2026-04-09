import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { BotaoSair } from "../../components/botaoSair";
import { stylesTelaPerfil } from "../../styles/telaPerfilStyles";
import { fonte } from "@/src/styles/fontes";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { Switch, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Image, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/stackNavigator";

type NavigationProp = StackNavigationProp<RootStackParamList, "MainTabs">;

export default function TelaPerfil() {

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isEnabledEmail, setIsEnabledEmail] = useState(false);
    const [isEnabledApp, setIsEnabledApp] = useState(false);
    const toggleSwitchEmail = () => setIsEnabledEmail(previousState => !previousState);
    const toggleSwitchApp = () => setIsEnabledApp(previousState => !previousState);
    
    const navigation = useNavigation<NavigationProp>();

    const handleSair = async () => {
        // #region Conexão Front-Back (Logout)
        try {
            await AsyncStorage.removeItem('@EcoBalance:token');
            navigation.navigate("TelaCarregamento" as never);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível sair.");
        }
        // #endregion
    };

    return (
        <View style={stylesGeral.telaInteira}>
            <View style={stylesTelaPerfil.cabecalho}>
            <Image source={require("../../assets/engrenagem.png")}/>
            <Text style={[stylesGeral.tituloPagina, {marginTop: 20, marginBottom: 20}]}>Perfil</Text>
            </View>
            <Text>Nome</Text>
            <TextInput
                style={[stylesGeral.input2, {marginBottom: 30, marginTop: 5}]}
                placeholder="Digite seu nome"
                value={usuario}
                onChangeText={setUsuario}
            />
            <Text>E-mail</Text>
            <TextInput
                style={[stylesGeral.input2, {marginBottom: 30, marginTop: 5}]}
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
            />
            <Text>Senha</Text>
            <TextInput
                style={[stylesGeral.input2, {marginBottom: 30, marginTop: 5}]}
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <View style={stylesTelaPerfil.notificacoesEmail}>
                <Text>Notificações por e-mail?</Text>
                <Switch
                    onValueChange={toggleSwitchEmail}
                    value={isEnabledEmail}
                />
            </View>
            <View style={stylesTelaPerfil.notificacoesApp}>
                <Text>Notificações do aplicativo?</Text>
                <Switch
                    onValueChange={toggleSwitchApp}
                    value={isEnabledApp}
                />
            </View>
            <BotaoSair onPress={handleSair} />

        </View>
    );
}   
