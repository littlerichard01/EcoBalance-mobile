import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function Gas (){

    const [pessoas, setPessoas] = useState('')
    const [tipoGas, setTipoGas] = useState('')
    const [gasEncanado, setGasEncanado] = useState('')
    const [tempoBotijao, setTempoBotijao] = useState('')
    const [tipoBotijao, setTipoBotijao] = useState('')

    return (

        <View>
            <Text>Fale brevemente sobre seu consumo de gás</Text>

            <View>
                <Text>Quantas pessoas vivem na sua casa?</Text>
                <TextInput
                value={pessoas}
                onChangeText={setPessoas}/>
            </View>

            <View>
                <Text>Você utiliza gás encanado ou compra botijões? </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                    {['Encanado', 'Botijao'].map((tipo) => (
                    <TouchableOpacity
                        key={tipo}
                        onPress={() => setTipoGas(tipo)}
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

            {tipoGas==='Encanado' && (
                <View>
                    <Text>Digite o valor em metros cubicos (m3) da sua última conta de gás natural corrigido:</Text>
                    <TextInput
                    style={{borderWidth: 1, borderColor: '#bbb'}}
                        value={gasEncanado}
                        onChangeText={setGasEncanado}
                        keyboardType="numeric"
                    />
                </View>    
            )}
            {tipoGas==='Botijao' &&(
                <View>

                    <View>
                        <Text>Qual tipo de botijão?</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                    {['Comum - P13', 'Medio - P20', 'Grande - P45'].map((tipo) => (
                    <TouchableOpacity
                        key={tipo}
                        onPress={() => setTipoBotijao(tipo)}
                        style={{
                            padding: 10,
                            backgroundColor: tipoBotijao === tipo ? '#2e7d32' : '#ccc',
                            borderRadius: 5
                        }}
                    >
                    <Text style={{ color: 'white', fontSize: 12 }}>{tipo.toUpperCase()}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
                    </View>

                    <View>
                        <Text>Quanto tempo dura o gás que você compra? (meses)</Text>
                        <TextInput 
                            value={tempoBotijao}
                            onChangeText={setTempoBotijao}
                            keyboardType="numeric"
                            style={{borderWidth: 1, borderColor: '#bbb'}}
                            />
                    </View>        
                </View>
            )}
        </View>
    )
}