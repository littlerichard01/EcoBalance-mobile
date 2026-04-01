import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function GasEncanado (){

    const [nomeRotina, setNomeRotina] = useState('')

    return (

        <View>
            <Text>Nomeie sua rotina</Text>

            <View>
                <Text>Nome da rotina:</Text>
                <TextInput
                placeholder="Digite o nome da rotina"
                value={nomeRotina}
                onChangeText={setNomeRotina}/>
            </View>
        </View>
    )
}