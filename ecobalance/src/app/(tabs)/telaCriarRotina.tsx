import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { ProgressBar } from "@/src/components/barraRolagem";
import { BotaoAvancar } from "@/src/components/botaoAvancar";
import NomeRotina from "./criarRotina/nomeRotina";
import  DietaRotina  from "./criarRotina/dietaRotina";
import { BotaoRetornar } from "@/src/components/botaoRetornar";
import Gas from "./criarRotina/gasRotina";
import TransporteRotina from "./criarRotina/veiculosRotina";
import EnergiaRotina from "./criarRotina/energiaRotina";
import ViagemRotina from "./criarRotina/viagensRotina";
import { BotaoConcluir } from "@/src/components/botaoConcluir";


export default function TelaCriarRotina() {

    const [index, setIndex] = useState(1);

    const handleAvancar = () => {
        if (index <4){
            setIndex(index+1)
        } 
    }
    const handleVoltar = () => {
        if (index>1){
            setIndex(index-1)
        }
    }


    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View>
        <BotaoRetornar onPress={() => navigation.goBack()}/>
        <View>
            <Text>Crie sua Rotina</Text>
            <View>
                <View>
                    <Text>Passo {index}: </Text>
                    <Text>
                        {index === 1 && "Nome"}
                        {index === 2 && "Dieta"}
                        {index === 3 && "Gás"}
                        {index === 4 && "Transporte"}
                    </Text>
                </View>
                <Text>{index}/4</Text>
            </View>
            <ProgressBar progresso={index / 4} />
        </View>

        <View>
            <View>
                {index === 1 && <NomeRotina/>}
                {index === 2 && <DietaRotina/>}
                {index === 3 && <Gas/>}
                {index === 4 && <TransporteRotina/>}
            </View>
        </View>

        <View>
            {index > 1 && (
                <BotaoRetornar onPress={handleVoltar}/>
            )}
            {index<4 && (
            <BotaoAvancar onPress={handleAvancar}/>
            )}
            {index===4 && (
            <BotaoConcluir onPress={()=>console.log("Salvar")}/>
            )}
        </View>


    </View>
  );
}
