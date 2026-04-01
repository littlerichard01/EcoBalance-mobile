import { fonte } from "@/src/styles/fontes";
import React from "react";
import { View, Text } from "react-native";
import { StylesTelaConquistas } from "../../styles/telaConquistasStyles";
import { Image } from "react-native";

export default function TelaConquistas() {
    return (
        <View style={StylesTelaConquistas.container}>
        <Image source={require("../../assets/trofeu.png")}/>
        <Text style={fonte.titulo}>Conquistas</Text>
        </View>

    );
}