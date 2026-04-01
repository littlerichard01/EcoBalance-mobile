import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function GasEncanado (){

    const [gasEncanado, setGasEncanado] = useState('')

    return (

        <View>
            <Text>Consumo Mensal de Gás Natural</Text>

            <View>
                <Text>Digite o valor em metros cúbicos (m³) da sua última conta de gás natural:</Text>
                <TextInput
                    style={{borderWidth: 1, borderColor: '#bbb', padding: 10, marginTop: 10}}
                    placeholder="Ex: 15.5"
                    value={gasEncanado}
                    onChangeText={setGasEncanado}
                    keyboardType="numeric"
                />
            </View>
        </View>
    )
}