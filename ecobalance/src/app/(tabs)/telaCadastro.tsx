import React from "react";
import { View, Text } from "react-native";
import { BotaoCriarConta } from "../../components/botaoCriarConta";

export default function TelaCadastro() {
    return (
        <View >
        <Text>Olá, esta é a tela de Cadastro!</Text>
        <BotaoCriarConta/>
        </View>

    );
}