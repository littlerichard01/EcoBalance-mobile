import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import TransporteSeletor from "./transporte";
import { stylesGeral } from "@/src/styles/stylesGeral";

export default function TransporteRotina({ rotinaData, updateRotina }: any) {
    const veiculo = rotinaData.usaVeiculo;
    const tipoTransporte = rotinaData.possuiVeiculo;
    const tipoCombustivel = rotinaData.combustivel;
    const litrosCombutivel = rotinaData.litrosCombustivel?.toString() || '';
    const kmRotina = rotinaData.kmTransportes || {};

    const value = [
        {label: 'Gasolina', value:'Gasolina'},
        {label: 'Diesel', value:'Diesel'},
        {label: 'Etanol', value:'Etanol'},
        {label: 'Elétrico', value:'Elétrico'},
        {label: 'Não usa combustivel', value:'Nenhum'},
    ];

    const toggleRotina = (nome: string, sel: boolean) => {
        const novoKmRotina = { ...kmRotina };
        let novosTransportes = [...(rotinaData.transportesPublicos || [])];

        if (sel) {
            novoKmRotina[nome] = 0;
            if (!novosTransportes.includes(nome)) {
                novosTransportes.push(nome);
            }
        } else {
            delete novoKmRotina[nome];
            novosTransportes = novosTransportes.filter(t => t !== nome);
        }
        
        updateRotina('kmTransportes', novoKmRotina);
        updateRotina('transportesPublicos', novosTransportes);
    };

    return (
        <ScrollView >
            <Text style={stylesGeral.subTituloPagina}>Agora nos conte sobre os veículos que utiliza</Text>

            <View>
                <Text style={stylesGeral.inputText}>Você utiliza algum tipo de veículo durante a semana?</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20, marginTop: 10 }}>
                    {['sim', 'nao'].map((tipo) => (
                        <TouchableOpacity
                            key={tipo}
                            style={{
                                padding: 10,
                                backgroundColor: veiculo === tipo ? '#2e7d32' : '#ccc',
                                borderRadius: 5,
                            }}
                            onPress={() => {
                                updateRotina('usaVeiculo', tipo);
                                if (tipo === 'nao') {
                                    updateRotina('possuiVeiculo', '');
                                    updateRotina('combustivel', '');
                                    updateRotina('litrosCombustivel', '');
                                    updateRotina('kmTransportes', {});
                                    updateRotina('transportesPublicos', []);
                                }
                            }}>
                            <Text  style={{ color: 'white', fontSize: 14 }}>
                                {tipo.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {veiculo === 'sim' && (
                <View>
                    <Text>Você possui um veículo próprio ou utiliza transporte público?</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20, marginTop: 10 }}>
                        {[
                            { label: 'Próprio', value: 'proprio' },
                            { label: 'Público', value: 'publico' }
                        ].map((tipo) => (
                            <TouchableOpacity
                                key={tipo.value}
                                onPress={() => updateRotina('possuiVeiculo', tipo.value)}
                                style={{
                                padding: 10,
                                backgroundColor: tipoTransporte === tipo.value ? '#2e7d32' : '#ccc',
                                borderRadius: 5
                            }}
                            >
                                <Text style={{ color: 'white', fontSize: 14 }}>
                                    {tipo.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>                    
                </View>
            )}

            {tipoTransporte === 'proprio' && (
                <View>
                    <View>
                        <Text style={stylesGeral.inputText}>Tipo de Combustível:</Text>
                        <Dropdown
                            data={value}
                            search
                            labelField="label"
                            valueField="value"
                            value={tipoCombustivel}
                            placeholder="Selecione o tipo de Combustível"
                            onChange={(item) => {
                                updateRotina('combustivel', item.value);
                            }}
                            style={stylesGeral.input2}
                        />
                    </View>
                    {tipoCombustivel === 'Elétrico' ? (
                        <View>
                            <Text style={stylesGeral.inputText}>Km rodados por mês no carro elétrico:</Text>
                            <TextInput
                                value={rotinaData.kmEletrico?.toString() || ''}
                                onChangeText={(text) => updateRotina('kmEletrico', text)}
                                keyboardType="numeric"
                                style={stylesGeral.input2}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text style={stylesGeral.inputText}>Litros abastecidos por mês:</Text>
                            <TextInput
                                value={litrosCombutivel}
                                onChangeText={(text) => updateRotina('litrosCombustivel', text)}
                                keyboardType="numeric"
                                style={stylesGeral.input2}
                            />
                        </View>
                    )}
                </View>
            )}
            {tipoTransporte === 'publico' && (
                <View>
                    <View>
                        <Text style={[stylesGeral.inputText, {marginBottom: 20}]}>Selecione os transportes que utiliza e o KM rodados no ultimo mês</Text>
                        <TransporteSeletor 
                        lista={['Ônibus', 'Ônibus elétrico', 'Metrô', 'Trem', 'Carro (app)', 'Motocicleta (app)']} 
                        dados={kmRotina}
                        onToggle={toggleRotina}
                        onUpdateKm={(nome, val) => {
                            const novoKmRotina = { ...kmRotina, [nome]: parseFloat(val) || 0 };
                            updateRotina('kmTransportes', novoKmRotina);
                        }}
                    />
                    </View>
                </View>
            )}

        </ScrollView>
    );
}
