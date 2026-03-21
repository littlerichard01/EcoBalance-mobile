import { BotaoCriarConta } from "../../components/botaoCriarConta";
import React from "react";
import { View, Text } from "react-native";


export default function TelaInicial() {
    return (
        <View>
        <Text>Olá, esta é a tela inicial!</Text>
        <BotaoCriarConta/>
        </View>
    );
}