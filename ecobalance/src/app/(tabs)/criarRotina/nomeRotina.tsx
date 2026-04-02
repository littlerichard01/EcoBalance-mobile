import { stylesGeral } from "@/src/styles/stylesGeral";
import { stylesTelaCriarRotina } from "@/src/styles/telasCriarRotinaStyle";
import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function NomeRotina({ rotinaData, updateRotina }: any) {
    return (
        <View>
            <Text style={stylesGeral.subTituloPagina}>Nomeie sua rotina</Text>

            <View style={stylesTelaCriarRotina.containerInput}>
                <Text style={stylesGeral.inputText}>Nome da rotina:</Text>
                <TextInput
                    placeholder="Digite o nome da rotina"
                    value={rotinaData.nome}
                    onChangeText={(text) => updateRotina('nome', text)}
                    style={stylesGeral.input2}
                />
            </View>
        </View>
    );
}