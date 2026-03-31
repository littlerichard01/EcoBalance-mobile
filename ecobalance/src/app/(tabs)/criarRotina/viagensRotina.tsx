import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

    const data = [
  { label: 'Trabalho', value: '1' },
  { label: 'Lazer', value: '2' },
  { label: 'Viagem de Aplicativo', value: '3' },
  { label: 'Outros', value: '4' },
];

export default function ViagemRotina (){

    const [viagem, setViagem] = useState('')
    const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);


    return (

        <View>
            <Text>Fale brevemente das viagens realizadas no último mês</Text>

            <View>
                <Text>Fez alguma viagem no último mês?</Text>
                <Text>Considere viagens longas ou curtas, como viagens de carro de aplicativo, etc.</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                        {['Sim', 'Não'].map((tipo) => (
                            <TouchableOpacity
                                key={tipo}
                                onPress={() => setViagem(tipo)}
                                style={{
                                padding: 10,
                                backgroundColor: viagem=== tipo ? '#2e7d32' : '#ccc',
                                borderRadius: 5
                            }}
                            >
                                <Text>
                                    {tipo}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                <Dropdown
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Selecione um item' : '...'}
        searchPlaceholder="Pesquisar..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />

            </View>
        </View>
    )
}