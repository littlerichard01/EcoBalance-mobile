import { fonte } from "@/src/styles/fontes";
import React from "react";
import { View, Text } from "react-native";
import { StylesTelaConquistas } from "../../styles/telaConquistasStyles";
import { Image } from "react-native";
import { stylesGeral } from "@/src/styles/stylesGeral";

export default function TelaConquistas() {
    return (
        <View style={stylesGeral.telaInteira}>
            <View style={{alignItems: 'center',     flex: 1, // Ocupa a tela inteira
    justifyContent: 'center',}}>
            <Image source={require("../../assets/trofeu.png")}/>
            <Text style={stylesGeral.tituloPagina}>Conquistas</Text>
            </View>
        </View>

    );
}