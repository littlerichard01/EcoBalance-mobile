import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";


export default function DietaRotina() {

    const [carneBovina, setCarneBovina] = useState('');
    const [carneSuina, setCarneSuina] = useState('');
    const [frango, setFrango] = useState('');
    const [peixe, setPeixe] = useState('');
    const [leite, setLeite] = useState('');
    const [ovos, setOvos] = useState('');
    const [leguminosas, setLeguminosas] = useState('');
    const [frutas, setFrutas] = useState('');
    const [cereais, setCereais] = useState('');

    const [dieta, setDieta] = useState<string |null>(null)
    const tipoDieta =[ 
        { label: 'Onivora', value: 'onivora'},
        { label: 'Vegetariana', value: 'vegetariana'},
        { label: 'Vegana', value: 'vegana'},
        { label: 'Pescetariana', value: 'pescetariana'},
        { label: 'Carnívora', value: 'carnivora'}
    ] ;

    {/*Define os campos das dietas*/}
    const renderCampos = () => {
        switch (dieta){
            case "carnivora":
                return (
                    <>
                        {renderInput("Carne Bovina (Pedaços)", carneBovina, setCarneBovina)}
                        {renderInput("Carne Suina (Pedaços)", carneSuina, setCarneSuina)}
                        {renderInput("Frango (Pedaços)", frango, setFrango)}
                        {renderInput("Peixe (Pedaços)", peixe, setPeixe)}
                        {renderInput("Leite (Litros)", leite, setLeite)}
                        {renderInput("Ovos (Unidade)", ovos, setOvos)}
                    </>
                )
            case "pescetariana":
                return (
                    <>
                        {renderInput("Peixe (Pedaços)", peixe, setPeixe)}
                        {renderInput("Leite (Litros)", leite, setLeite)}
                        {renderInput("Ovos (Unidade)", ovos, setOvos)}
                        {renderInput("Leguminosas (Porçoes)", leguminosas, setLeguminosas)}
                        {renderInput("Frutas e Vegetais (Porçoes)", frutas, setFrutas)}
                        {renderInput("Cereais Integrais (Porçoes)", cereais, setCereais)}
                    </>
                )
            case "vegana":
                return (
                    <>
                        {renderInput("Leguminosas (Porçoes)", leguminosas, setLeguminosas)}
                        {renderInput("Frutas e Vegetais (Porçoes)", frutas, setFrutas)}
                        {renderInput("Cereais Integrais (Porçoes)", cereais, setCereais)}
                    </>
                )
            case "vegetariana":
                return (
                    <>
                        {renderInput("Leite (Litros)", leite, setLeite)}
                        {renderInput("Ovos (Unidade)", ovos, setOvos)}
                        {renderInput("Leguminosas (Porçoes)", leguminosas, setLeguminosas)}
                        {renderInput("Frutas e Vegetais (Porçoes)", frutas, setFrutas)}
                        {renderInput("Cereais Integrais (Porçoes)", cereais, setCereais)}
                    </>
                )
            default: 
                return (
                    <>
                        {renderInput("Carne Bovina (Pedaços)", carneBovina, setCarneBovina)}
                        {renderInput("Carne Suina (Pedaços)", carneSuina, setCarneSuina)}
                        {renderInput("Frango (Pedaços)", frango, setFrango)}
                        {renderInput("Peixe (Pedaços)", peixe, setPeixe)}
                        {renderInput("Leite (Litros)", leite, setLeite)}
                        {renderInput("Ovos (Unidade)", ovos, setOvos)}
                        {renderInput("Leguminosas (Porções)", leguminosas, setLeguminosas)}
                        {renderInput("Frutas e Vegetais (Porções)", frutas, setFrutas)}
                        {renderInput("Cereais Integrais (Porções)", cereais, setCereais)}
                    </>
                );
        }
    }

    const renderInput = (label: string, value: string, onChange: (t:string) => void) =>(        
        <View>
            <Text>{label}</Text>
            <TextInput
            value={value}
            onChangeText={onChange}/>
        </View>
    )

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <View>
                <Text>Fale um pouco sobre sua dieta quando segue essa rotina</Text>
            </View>

            <View>
                <Text>Selecione sua dieta:</Text>
                <Dropdown
                    data={tipoDieta}
                    search
                    labelField="label"
                    valueField="value"
                    value={dieta}
                    placeholder="Selecione a dieta"
                    onChange={(item) => {
                        setDieta(item.value);
                    }}
                    style={{padding: 10, borderColor: '#000', borderWidth: 1}}
                />
            </View>


                <ScrollView>
                    <Text>Porções consumidas por semana:</Text>
                    {renderCampos()}
                </ScrollView>

        </ScrollView>
    );
}