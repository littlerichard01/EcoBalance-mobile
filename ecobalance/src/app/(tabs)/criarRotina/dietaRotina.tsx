import { stylesGeral } from "@/src/styles/stylesGeral";
import { parseNonNegativeNumber, sanitizeNonNegativeNumberText } from "@/src/utils/numericInput";
import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const CAMPOS_PADRAO = [
    "Carne bovina",
    "Carne suína",
    "Frango",
    "Peixe",
    "Leite",
    "Ovos",
    "Leguminosas",
    "Frutas e vegetais",
    "Cereais integrais",
] as const;

const CAMPOS_POR_DIETA: Record<string, readonly string[]> = {
    carnivora: ["Carne bovina", "Carne suína", "Frango", "Peixe", "Leite", "Ovos"],
    pescetariana: ["Peixe", "Leite", "Ovos", "Leguminosas", "Frutas e vegetais", "Cereais integrais"],
    vegana: ["Leguminosas", "Frutas e vegetais", "Cereais integrais"],
    vegetariana: ["Leite", "Ovos", "Leguminosas", "Frutas e vegetais", "Cereais integrais"],
    onivora: CAMPOS_PADRAO,
};

export default function DietaRotina({ rotinaData, updateRotina }: any) {
    const dieta = rotinaData.dieta;
    const porcoes = rotinaData.porcoes || {};

    const updatePorcao = (alimento: string, valor: string) => {
        const num = parseNonNegativeNumber(valor);
        updateRotina('porcoes', { ...porcoes, [alimento]: num });
    };

    const getPorcao = (alimento: string) => {
        return porcoes[alimento]?.toString() || '';
    };

    const tipoDieta = [ 
        { label: 'Onivora', value: 'onivora'},
        { label: 'Vegetariana', value: 'vegetariana'},
        { label: 'Vegana', value: 'vegana'},
        { label: 'Pescetariana', value: 'pescetariana'},
        { label: 'Carnívora', value: 'carnivora'}
    ];

    const renderCampos = () => {
        const campos = CAMPOS_POR_DIETA[dieta] || CAMPOS_PADRAO;
        return (
            <>
                {campos.map((alimento) =>
                    renderInput(alimento, getPorcao(alimento), (v) =>
                        updatePorcao(alimento, v),
                    ),
                )}
            </>
        );
    }

    const renderInput = (label: string, value: string, onChange: (t:string) => void) =>(        
        <View style={{ marginLeft: 15 }}>
            <Text style={[stylesGeral.inputText, {marginTop: 10}]}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={(t) => onChange(sanitizeNonNegativeNumberText(t))}
                keyboardType="numeric"
                style={stylesGeral.subInputText}
            />
        </View>
    )

    return (
        <View>
            <View>
                <Text style={stylesGeral.subTituloPagina}>Fale um pouco sobre sua dieta quando segue essa rotina</Text>
            </View>

            <View>
                <Text style={stylesGeral.inputText}>Selecione sua dieta:</Text>
                <Dropdown
                    data={tipoDieta}
                    search
                    labelField="label"
                    valueField="value"
                    value={dieta}
                    placeholder="Selecione a dieta"
                    onChange={(item) => {
                        updateRotina('dieta', item.value);
                        updateRotina('porcoes', {}); // Limpa porções ao mudar de dieta
                    }}
                    style={[stylesGeral.input2, {marginTop: 10}]}
                />
            </View>


            {dieta && (
                <ScrollView>
                    <Text style={[stylesGeral.inputText, {marginTop: 30, marginBottom: 10}]}>Porções consumidas por semana:</Text>
                    {renderCampos()}
                </ScrollView>
            )}

        </View>
    );
}
