import React from "react";
import { Button, View, Text } from "react-native";


export default function TelaLogin() {
    return (
        <View>
            <Text>Olá, esta é a tela de login!</Text>
            <Button title="Entrar" onPress={() => alert("Botão de login pressionado")} />   
        </View>
    );
}