import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";

export default function TransporteRotina() {
    const [veiculo, setVeiculo] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('');
    const [combustivel, setCombustivel] = useState('');
    const [litrosCombutivel, setLitrosCombustivel] = useState('');

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
                            }}
                        >
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
                                    {tipo.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}

            {tipoTransporte === 'Próprio' && (
                <View>
                    <Text>Tipo de Combustível:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                        {['Gasolina', 'Diesel', 'Etanol', 'Eletrico', 'N/A'].map((tipo) => (
                            <TouchableOpacity
                                key={tipo}
                                onPress={() => setCombustivel(tipo)}
                                style={{
                                padding: 10,
                                backgroundColor: combustivel === tipo ? '#2e7d32' : '#ccc',
                                borderRadius: 5
                            }}
                            >
                                <Text>
                                    {tipo}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View>
                        <Text>Litros abastecidos por mês:</Text>
                        <TextInput
                            value={litrosCombutivel}
                            onChangeText={setLitrosCombustivel}
                            keyboardType="numeric"
                            style={{borderWidth: 1, borderColor: '#bbb'}}
                        />
                    </View>
                </View>
            )}

        </ScrollView>
    );
}
