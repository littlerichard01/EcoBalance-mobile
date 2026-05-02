import { stylesGeral } from "@/src/styles/stylesGeral";
import { sanitizeNonNegativeNumberText } from "@/src/utils/numericInput";
import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function GasEncanado ({ calculoData, updateCalculo }: any){

    return (

        <View>
            <Text style={stylesGeral.subTituloPagina}>Consumo Mensal de Gás Natural</Text>

            <View>
                <Text style={[stylesGeral.inputText, {marginTop: 10}]}>Digite o valor em metros cúbicos (m³) da sua última conta de gás natural:</Text>
                <TextInput
                    style={[stylesGeral.input2, {marginTop: 20}]}
                    placeholder="Ex: 15.5"
                    value={calculoData.gasNatural.m3}
                    onChangeText={(text) => updateCalculo('gasNatural', { ...calculoData.gasNatural, m3: sanitizeNonNegativeNumberText(text) })}
                    keyboardType="numeric"
                />
            </View>
        </View>
    )
}
