import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from "react-native";
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
import api from "../../services/api";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { stylesTelaCriarRotina } from "@/src/styles/telasCriarRotinaStyle";
import { BotaoVoltar } from "@/src/components/botaoVoltarRotina";
import { ScrollView } from "react-native-gesture-handler";

export default function TelaCriarRotina() {
    const [index, setIndex] = useState(1);
    
    // Estado unificado da rotina
    const [rotinaData, setRotinaData] = useState({
        nome: '',
        dieta: '',
        porcoes: {},
        quantidadePessoas: '',
        tipoGas: '',
        tipoBotijao: '',
        tempoDuracaoGas: '',
        usaVeiculo: '',
        possuiVeiculo: '',
        combustivel: '',
        litrosCombustivel: '',
        kmEletrico: '',
        transportesPublicos: [] as string[],
        kmTransportes: {}
    });

    // Função para atualizar campos específicos da rotina
    const updateRotina = (key: string, value: any) => {
        setRotinaData(prev => ({ ...prev, [key]: value }));
    };

    const handleAvancar = () => {
        if (index === 1 && !rotinaData.nome) {
            Alert.alert("Aviso", "Por favor, informe o nome da rotina.");
            return;
        }
        if (index < 4){
            setIndex(index+1)
        } 
    }
    
    const handleVoltar = () => {
        if (index > 1){
            setIndex(index-1)
        }
    }

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleSalvar = async () => {
        try {
            // Formatar os dados antes de enviar
            const payload = {
                ...rotinaData,
                quantidadePessoas: Number(rotinaData.quantidadePessoas) || 1,
                tempoDuracaoGas: Number(rotinaData.tempoDuracaoGas) || 0,
                litrosCombustivel: Number(rotinaData.litrosCombustivel) || 0,
                kmEletrico: Number(rotinaData.kmEletrico) || 0,
            };

            await api.post('/rotinas', payload);
            Alert.alert("Sucesso", "Rotina criada com sucesso!");
            navigation.goBack(); // Volta para a tela de listar rotinas
        } catch (error: any) {
            console.error("Erro ao criar rotina:", error.response?.data || error.message);
            Alert.alert("Erro", "Falha ao criar rotina: " + (error.response?.data?.message || error.message));
        }
    };

  return (
    <ScrollView style={stylesGeral.telaInteira}>
        <View>
        <View style={stylesTelaCriarRotina.cabecario}>
        <BotaoRetornar onPress={() => navigation.goBack()}/>
            <Text style={stylesGeral.tituloPagina}>Crie sua Rotina</Text>
        </View>
            <View style={stylesGeral.containerPassosTexto}>
                <View style={{flexDirection: 'row' }}>
                    <Text style={stylesGeral.passosTexto}>Passo {index}: </Text>
                    <Text style={stylesGeral.passosTexto}>
                        {index === 1 && "Nome"}
                        {index === 2 && "Dieta"}
                        {index === 3 && "Gás"}
                        {index === 4 && "Transporte"}
                    </Text>
                </View>
                <Text style={stylesGeral.passosTexto}>{index}/4</Text>
            </View>
            <ProgressBar progresso={index / 4} />
        </View>

        <View>
            <View>
                {index === 1 && <NomeRotina rotinaData={rotinaData} updateRotina={updateRotina} />}
                {index === 2 && <DietaRotina rotinaData={rotinaData} updateRotina={updateRotina} />}
                {index === 3 && <Gas rotinaData={rotinaData} updateRotina={updateRotina} />}
                {index === 4 && <TransporteRotina rotinaData={rotinaData} updateRotina={updateRotina} />}
            </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 120}}>
            {index > 1 && (
            <BotaoVoltar onPress={handleVoltar}/>
            )}
            {index<4 && (
            <BotaoAvancar onPress={handleAvancar}/>
            )}
            {index===4 && (
            <BotaoConcluir onPress={handleSalvar}/>
            )}
        </View>

    </ScrollView>
  );
}
