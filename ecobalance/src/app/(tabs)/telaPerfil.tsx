import React from "react";
import { View, Text } from "react-native";
import { BotaoSair } from "../../components/botaoSair";

export default function TelaPerfil() {
    return (
        <View>
            <Text>Olá, esta é a tela de perfil!</Text>
            <BotaoSair />
        </View>
    );
}   