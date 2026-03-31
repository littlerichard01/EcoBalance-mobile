import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function EnergiaRotina (){

    const [energiaEletrica, setEnergiaEletrica] = useState('')

    return (

        <View>
            <Text>Nomeie sua rotina</Text>

            <View>
                <Text>Digite o valor de KW/h da sua última conta de energia elétrica:</Text>
                <TextInput
                value={energiaEletrica}
                onChangeText={setEnergiaEletrica}
                keyboardType="numeric"
                style={{borderWidth: 1, borderColor: '#bbb'}}/>
            </View>
        </View>
    )
}