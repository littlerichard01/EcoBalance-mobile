import React, { useState,  } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";


export default function SelecionaRotina (){

    const [listaRotinas, setListaRotinas] = useState([]);

    return (

        <View>
            <Text>Selecione uma rotina pré cadastrada ou cadastre uma nova</Text>

            <View>
                <Dropdown
                    data={listaRotinas}
                    search
                    labelField="label"
                    valueField="value"
                    value={listaRotinas}
                    placeholder=""
                    onChange={(item) => {
                        setListaRotinas(item.value);
                    }}
                    style={{padding: 10, borderColor: '#000', borderWidth: 1}}
                    />
            </View>
        </View>
    )
}