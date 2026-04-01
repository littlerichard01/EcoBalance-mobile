import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function NomeRotina({ rotinaData, updateRotina }: any) {
    return (
        <View>
            <Text>Nomeie sua rotina</Text>

            <View>
                <Text>Nome da rotina:</Text>
                <TextInput
                    placeholder="Digite o nome da rotina"
                    value={rotinaData.nome}
                    onChangeText={(text) => updateRotina('nome', text)}
                />
            </View>
        </View>
    );
}