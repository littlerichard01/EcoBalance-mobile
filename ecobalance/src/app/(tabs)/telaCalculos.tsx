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
import { stylesGeral } from "@/src/styles/stylesGeral";
import { stylesTelaCriarRotina } from "@/src/styles/telasCriarRotinaStyle";
import { BotaoVoltar } from "@/src/components/botaoVoltarRotina";
import { ScrollView } from "react-native-gesture-handler";

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
        
        <ScrollView style={stylesGeral.telaInteira}>
            <View>
        <View style={stylesTelaCriarRotina.cabecario}>
            <Text style={[stylesGeral.tituloPagina, {fontSize:32}]}>Calcule sua Pegada</Text>
        </View>
            <View style={stylesGeral.containerPassosTexto}>
                <View style={{flexDirection: 'row' }}>
                    <Text style={stylesGeral.passosTexto}>Passo {index}: </Text>
                    <Text style={stylesGeral.passosTexto}>
                        {index === 1 && "Rotina"}
                        {index === 2 && "Energia Elétrica"}
                        {index === 3 && "Gás Natural"}
                        {index === 4 && "Viagens"}
                    </Text>
                </View>
                <Text style={stylesGeral.passosTexto}>{index}/4</Text>
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
            
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 90}}>
            {index > 1 && (
                <BotaoVoltar onPress={handleVoltar}/>
            )}
            {index<4 && (
            <BotaoAvancar onPress={handleAvancar}/>
            )}
            {index===4 && (
            <BotaoConcluir onPress={()=>navigation.navigate("ResultadoCalculo")}/>
            )}
                    </View>
        </ScrollView>
    );
}