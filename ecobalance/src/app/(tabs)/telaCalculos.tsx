import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { ProgressBar } from "@/src/components/barraRolagem";
import { BotaoAvancar } from "@/src/components/botaoAvancar";
import { BotaoRetornar } from "@/src/components/botaoRetornar";
import EnergiaRotina from "./criarRotina/energiaRotina";
import ViagemRotina from "./criarRotina/viagensRotina";
import SelecionaRotina from "./criarRotina/selecionaRotina";
import GasEncanado from "./criarRotina/gasEncanadoCalculo";
import Gas from "./criarRotina/gasRotina";
import { BotaoConcluir } from "@/src/components/botaoConcluir";

export default function TelaCalculos() {

        const [tipoGas] = useState('')

        const [index, setIndex] = useState(1);
    
        const handleAvancar = () => {
            if (index <5){
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
            <View>
                <Text>Calcule sua pegada de Carbono</Text>
                <View>
                    <View>
                        <Text>Passo {index}: </Text>
                        <Text>
                            {index === 1 && "Rotina"}
                            {index === 2 && "Energia Elétrica"}
                            {index === 3 && "Gás Natural"}
                            {index === 4 && "Viagens"}
                        </Text>
                    </View>
                    <Text>{index}/4</Text>
                </View>
                <ProgressBar progresso={index / 4} />
            </View>

                    <View>
                        <View>
                            {index === 1 && <SelecionaRotina/>}
                            {index === 2 && <EnergiaRotina/>}
                            {index === 3 && <GasEncanado/>}
                            {index === 4 && <ViagemRotina/>}
                
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
            <BotaoConcluir onPress={()=>navigation.navigate("ResultadoCalculo")}/>
            )}
                    </View>
        </View>
    );
}