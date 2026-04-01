import { BotaoCriarRotina } from "@/src/components/botaoCriarRotina";
import { fonte } from "@/src/styles/fontes";
import React from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";


export default function TelaRotina() {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [rotina, setRotina] = useState(null);

    return (   
        <View>
            <View>
                <Image 
                source={require('../../assets/rotinalogo.png')}/>
                <Text style={fonte.titulo}>Rotinas:</Text>
            </View>

            <Text>Rotinas Criadas Anteriormente: </Text>
            <FlatList data={rotina} 
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <View>
                            <image />
                            <Text> botao futuro</Text>
                        </View>
                        <Text >{item.nomerotina}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>Nenhuma rotina encontrada.</Text>}
            />

            <BotaoCriarRotina onPress={() => navigation.navigate("TelaCriarRotina")}/>
        </View>
    );
}