import { stylesGeral } from "@/src/styles/stylesGeral";
import { sanitizeNonNegativeNumberText } from "@/src/utils/numericInput";
import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function EnergiaRotina ({ calculoData, updateCalculo }: any){

    return (

        <View>
            <Text style={stylesGeral.subTituloPagina}>Consumo Mensal de Energia</Text>

            <View>
                <Text style={[stylesGeral.inputText, {marginTop: 15}]}>Digite o valor de kWh da sua última conta de energia elétrica:</Text>
                <TextInput
                value={calculoData.energiaEletrica.kwh}
                onChangeText={(text) => updateCalculo('energiaEletrica', { ...calculoData.energiaEletrica, kwh: sanitizeNonNegativeNumberText(text) })}
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                style={[stylesGeral.input2, {marginTop: 15}]}/>
            </View>
        </View>
    )
}
