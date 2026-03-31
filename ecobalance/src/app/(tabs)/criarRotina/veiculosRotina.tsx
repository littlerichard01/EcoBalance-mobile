import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import TransportePublico from "./transporte";
import TransporteSeletor from "./transporte";

export default function TransporteRotina() {
    const [veiculo, setVeiculo] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('');
    const [combustivel, setCombustivel] = useState('');
    const [litrosCombutivel, setLitrosCombustivel] = useState('');

    const [kmRotina, setKmRotina] = useState<Record<string, number>>({});
    const [tipoCombustivel, setTipoCombustivel]=useState<string | null>(null);
    const value = [
        {label: 'Gasolina', value:'gasolina'},
        {label: 'Diesel', value:'diesel'},
        {label: 'Etanol', value:'etanol'},
        {label: 'Eletrico', value:'gasolina'},
        {label: 'Não usa combustivel', value:'n/a'},
    ]

    const toggleRotina = (nome: string, sel: boolean) => {
    setKmRotina(prev => {
        const novo = { ...prev };
        if (sel){
            novo[nome]=0;
        } else {
            delete novo[nome]
        }
        return novo;
    });
};

    return (
        <ScrollView >
            <Text>Agora nos conte sobre os veículos que utiliza</Text>

            <View>
                <Text>Você utiliza algum tipo de veículo durante a semana?</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                    {['Sim', 'Não'].map((tipo) => (
                        <TouchableOpacity
                            key={tipo}
                            style={{
                                padding: 10,
                                backgroundColor: veiculo === tipo ? '#2e7d32' : '#ccc',
                                borderRadius: 5
                            }}
                            onPress={() => {
                                setVeiculo(tipo);
                                if (tipo === 'Não') {
                                    setTipoTransporte('');
                                    setCombustivel('');
                                    setLitrosCombustivel('');
                                }
                            }}>
                            <Text>
                                {tipo.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {veiculo === 'Sim' && (
                <View>
                    <Text>Você possui um veículo próprio ou utiliza transporte público?</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                        {['Próprio', 'Publico'].map((tipo) => (
                            <TouchableOpacity
                                key={tipo}
                                onPress={() => setTipoTransporte(tipo)}
                                style={{
                                padding: 10,
                                backgroundColor: tipoTransporte === tipo ? '#2e7d32' : '#ccc',
                                borderRadius: 5
                            }}
                            >
                                <Text>
                                    {tipo}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>                    
                </View>
            )}

            {tipoTransporte === 'Próprio' && (
                <View>
                        <Text>Litros abastecidos por mês:</Text>
                        <TextInput
                            value={litrosCombutivel}
                            onChangeText={setLitrosCombustivel}
                            keyboardType="numeric"
                            style={{borderWidth: 1, borderColor: '#bbb'}}
                        />
                </View>
            )}
            {tipoTransporte === 'Publico' && (
                <View>
                    <View>
                    <Text>Tipo de Combustível:</Text>
                    <Dropdown
                        data={value}
                        search
                        labelField="label"
                        valueField="value"
                        value={tipoCombustivel}
                        placeholder="Selecione o tipo de Combustivel"
                        onChange={(item) => {
                            setTipoCombustivel(item.value);
                        }}
                        style={{padding: 10, borderColor: '#000', borderWidth: 1}}
                    />
                    </View>
                    <View>
                        <TransporteSeletor 
                        lista={['Onibus', 'Onibus Eletrico', 'Metrô', 'Trem', 'Carro(app)', 'Moto(app)']} 
                        dados={kmRotina}
                        onToggle={toggleRotina}
                        onUpdateKm={(nome, val) => setKmRotina(prev => ({...prev, [nome]: parseFloat(val) || 0}))}
                    />
                    </View>
                </View>
            )}

        </ScrollView>
    );
}
