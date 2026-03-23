import { BotaoCriarConta } from "../../components/botaoCriarConta";
import { LinkTenhoConta } from "../../components/linkTenhoConta";
import React from "react";
import { View, Text } from "react-native";
import {useNavigation} from '@react-navigation/native';

export default function TelaInicial() {
    return (
        <View>
        <Text>Olá, esta é a tela inicial!</Text>
        <BotaoCriarConta/>
        <LinkTenhoConta/>
        </View>
    );
}