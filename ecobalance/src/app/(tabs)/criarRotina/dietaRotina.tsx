import { stylesGeral } from "@/src/styles/stylesGeral";
import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function DietaRotina({ rotinaData, updateRotina }: any) {
    const dieta = rotinaData.dieta;
    const porcoes = rotinaData.porcoes || {};

    const updatePorcao = (alimento: string, valor: string) => {
        const num = parseFloat(valor) || 0;
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
        switch (dieta){
            case "carnivora":
                return (
                    <>
                        {renderInput("Carne bovina", getPorcao("Carne bovina"), (v) => updatePorcao("Carne bovina", v))}
                        {renderInput("Carne suína", getPorcao("Carne suína"), (v) => updatePorcao("Carne suína", v))}
                        {renderInput("Frango", getPorcao("Frango"), (v) => updatePorcao("Frango", v))}
                        {renderInput("Peixe", getPorcao("Peixe"), (v) => updatePorcao("Peixe", v))}
                        {renderInput("Leite", getPorcao("Leite"), (v) => updatePorcao("Leite", v))}
                        {renderInput("Ovos", getPorcao("Ovos"), (v) => updatePorcao("Ovos", v))}
                    </>
                )
            case "pescetariana":
                return (
                    <>
                        {renderInput("Peixe", getPorcao("Peixe"), (v) => updatePorcao("Peixe", v))}
                        {renderInput("Leite", getPorcao("Leite"), (v) => updatePorcao("Leite", v))}
                        {renderInput("Ovos", getPorcao("Ovos"), (v) => updatePorcao("Ovos", v))}
                        {renderInput("Leguminosas", getPorcao("Leguminosas"), (v) => updatePorcao("Leguminosas", v))}
                        {renderInput("Frutas e vegetais", getPorcao("Frutas e vegetais"), (v) => updatePorcao("Frutas e vegetais", v))}
                        {renderInput("Cereais integrais", getPorcao("Cereais integrais"), (v) => updatePorcao("Cereais integrais", v))}
                    </>
                )
            case "vegana":
                return (
                    <>
                        {renderInput("Leguminosas", getPorcao("Leguminosas"), (v) => updatePorcao("Leguminosas", v))}
                        {renderInput("Frutas e vegetais", getPorcao("Frutas e vegetais"), (v) => updatePorcao("Frutas e vegetais", v))}
                        {renderInput("Cereais integrais", getPorcao("Cereais integrais"), (v) => updatePorcao("Cereais integrais", v))}
                    </>
                )
            case "vegetariana":
                return (
                    <>
                        {renderInput("Leite", getPorcao("Leite"), (v) => updatePorcao("Leite", v))}
                        {renderInput("Ovos", getPorcao("Ovos"), (v) => updatePorcao("Ovos", v))}
                        {renderInput("Leguminosas", getPorcao("Leguminosas"), (v) => updatePorcao("Leguminosas", v))}
                        {renderInput("Frutas e vegetais", getPorcao("Frutas e vegetais"), (v) => updatePorcao("Frutas e vegetais", v))}
                        {renderInput("Cereais integrais", getPorcao("Cereais integrais"), (v) => updatePorcao("Cereais integrais", v))}
                    </>
                )
            default: 
                return (
                    <>
                        {renderInput("Carne bovina", getPorcao("Carne bovina"), (v) => updatePorcao("Carne bovina", v))}
                        {renderInput("Carne suína", getPorcao("Carne suína"), (v) => updatePorcao("Carne suína", v))}
                        {renderInput("Frango", getPorcao("Frango"), (v) => updatePorcao("Frango", v))}
                        {renderInput("Peixe", getPorcao("Peixe"), (v) => updatePorcao("Peixe", v))}
                        {renderInput("Leite", getPorcao("Leite"), (v) => updatePorcao("Leite", v))}
                        {renderInput("Ovos", getPorcao("Ovos"), (v) => updatePorcao("Ovos", v))}
                        {renderInput("Leguminosas", getPorcao("Leguminosas"), (v) => updatePorcao("Leguminosas", v))}
                        {renderInput("Frutas e vegetais", getPorcao("Frutas e vegetais"), (v) => updatePorcao("Frutas e vegetais", v))}
                        {renderInput("Cereais integrais", getPorcao("Cereais integrais"), (v) => updatePorcao("Cereais integrais", v))}
                    </>
                );
        }
    }

    const renderInput = (label: string, value: string, onChange: (t:string) => void) =>(        
        <View>
            <Text style={[stylesGeral.inputText, {marginTop: 10}]}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                style={{ borderWidth: 1, borderColor: '#bbb', padding: 5, marginVertical: 5 }}
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
                    <Text style={[stylesGeral.inputText, {marginTop: 20}]}>Porções consumidas por semana:</Text>
                    {renderCampos()}
                </ScrollView>
            )}

        </View>
    );
}
