import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function Gas({ rotinaData, updateRotina }: any) {
    const pessoas = rotinaData.quantidadePessoas?.toString() || '';
    const tipoGas = rotinaData.tipoGas;
    const tempoBotijao = rotinaData.tempoDuracaoGas?.toString() || '';
    const tipoBotijao = rotinaData.tipoBotijao;

    return (
        <View>
            <Text>Fale brevemente sobre seu consumo de gás</Text>

            <View>
                <Text>Quantas pessoas vivem na sua casa?</Text>
                <TextInput
                    value={pessoas}
                    onChangeText={(text) => updateRotina('quantidadePessoas', text)}
                    keyboardType="numeric"
                    style={{ borderWidth: 1, borderColor: '#bbb', padding: 5, marginVertical: 5 }}
                />
            </View>

            <View>
                <Text>Você utiliza gás encanado ou compra botijões?</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                    {['encanado', 'botijao'].map((tipo) => (
                        <TouchableOpacity
                            key={tipo}
                            onPress={() => updateRotina('tipoGas', tipo)}
                            style={{
                                padding: 10,
                                backgroundColor: tipoGas === tipo ? '#2e7d32' : '#ccc',
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 12 }}>{tipo.toUpperCase()}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {tipoGas === 'encanado' && (
                <View>
                    <Text style={{ marginTop: 10, fontStyle: 'italic', color: '#555' }}>
                        Como você utiliza gás encanado, o valor consumido em m³ será solicitado a cada vez que você realizar um cálculo (Teste de Usuário) mensal.
                    </Text>
                </View>    
            )}

            {tipoGas === 'botijao' && (
                <View>
                    <View>
                        <Text>Qual tipo de botijão?</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                            {[
                                { label: 'Comum - P13', value: 'P13' },
                                { label: 'Médio - P20', value: 'P20' },
                                { label: 'Grande - P45', value: 'P45' }
                            ].map((tipo) => (
                                <TouchableOpacity
                                    key={tipo.value}
                                    onPress={() => updateRotina('tipoBotijao', tipo.value)}
                                    style={{
                                        padding: 10,
                                        backgroundColor: tipoBotijao === tipo.value ? '#2e7d32' : '#ccc',
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 12 }}>{tipo.label.toUpperCase()}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text>Quanto tempo dura o gás que você compra? (meses)</Text>
                        <TextInput 
                            value={tempoBotijao}
                            onChangeText={(text) => updateRotina('tempoDuracaoGas', text)}
                            keyboardType="numeric"
                            style={{borderWidth: 1, borderColor: '#bbb', padding: 5, marginVertical: 5}}
                        />
                    </View>        
                </View>
            )}
        </View>
    );
}