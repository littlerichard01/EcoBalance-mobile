import { BotaoRetornar } from "@/src/components/botaoRetornar";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function ResultadoCalculo (){

    const [resultadoCalculo] = useState('')
    const [resultadoAlimentos] = useState('')
    const [resultadoGas] = useState('')
    const [resultadoVeiculos] = useState('')

const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View>
            <BotaoRetornar onPress={() => navigation.goBack()}/>
            <Text>Resultado:</Text>

            <View>
                <Text>Resultado Total:{resultadoCalculo}</Text>
                <View>
                    <Text>Valores por área:</Text>
                    <Text>Alimentos: {resultadoAlimentos}</Text>
                    <Text>Gás: {resultadoGas}</Text>
                    <Text>Veiculos: {resultadoVeiculos}</Text>
                </View>
            </View>

            <View>
                <Text>Valores Mundiais:</Text>
                <View>
                    <Text>Valores por área:</Text>
                    <Text>Alimentos: </Text>
                    <Text>Gás: </Text>
                    <Text>Veiculos: </Text>
                </View>
            </View>
        </View>
    )
}