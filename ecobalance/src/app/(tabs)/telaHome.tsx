import { stylesGeral } from "@/src/styles/stylesGeral";
import React from "react";
import { View, Text } from "react-native";

export default function home() {
    return (
        <View style={stylesGeral.telaInteira}>
        <Text>Olá, esta é a Home!!!</Text>
        </View>
    );
}