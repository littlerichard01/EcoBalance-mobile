import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import api from "@/src/services/api";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { stylesTelaRotina } from "@/src/styles/telaRotinaStyle";
import { BotaoRetornar } from "@/src/components/botaoRetornar";

type EditarRotinaRouteProp = RouteProp<RootStackParamList, "TelaEditarRotina">;
type EditarRotinaNavigationProp = StackNavigationProp<RootStackParamList, "TelaEditarRotina">;

export default function TelaEditarRotina() {
  const route = useRoute<EditarRotinaRouteProp>();
  const navigation = useNavigation<EditarRotinaNavigationProp>();
  const { rotinaId } = route.params;

  // Estados para os campos
  const [nome, setNome] = useState("");
  const [tipoDieta, setTipoDieta] = useState("");
  const [porcoesSemana, setPorcoesSemana] = useState("");
  const [qtdPessoas, setQtdPessoas] = useState("");
  const [tipoGas, setTipoGas] = useState("");
  const [veiculos, setVeiculos] = useState("");

  // Carregar dados da rotina ao abrir
  useEffect(() => {
    const carregarRotina = async () => {
      try {
        const response = await api.get(`/rotinas/${rotinaId}`);
        const rotina = response.data;
        setNome(rotina.nome);
        setTipoDieta(rotina.tipoDieta);
        setPorcoesSemana(String(rotina.porcoesSemana));
        setQtdPessoas(String(rotina.qtdPessoas));
        setTipoGas(rotina.tipoGas);
        setVeiculos(rotina.veiculos);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar a rotina.");
      }
    };
    carregarRotina();
  }, [rotinaId]);

  // Função para salvar alterações
  const salvarAlteracoes = async () => {
    try {
      await api.put(`/rotinas/${rotinaId}`, {
        nome,
        tipoDieta,
        porcoesSemana,
        qtdPessoas,
        tipoGas,
        veiculos,
      });
      Alert.alert("Sucesso", "Rotina atualizada!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  // Função para excluir rotina
  const deletarRotina = async () => {
    Alert.alert("Excluir Rotina", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/rotinas/${rotinaId}`);
            Alert.alert("Sucesso", "Rotina excluída.");
            navigation.goBack();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={stylesGeral.telaInteira}>
      <View style={stylesTelaRotina.cabecarioTela}>
        <BotaoRetornar onPress={() => navigation.goBack()} />
        <Text style={stylesGeral.tituloPagina}>Editar Rotina</Text>
      </View>

      {/* Formulário */}
      <View>
        <Text style={stylesGeral.inputText}>Nome da rotina</Text>
        <TextInput style={stylesGeral.textInput} value={nome} onChangeText={setNome} />

        <Text style={stylesGeral.inputText}>Tipo de dieta</Text>
        <TextInput style={stylesGeral.textInput} value={tipoDieta} onChangeText={setTipoDieta} />

        <Text style={stylesGeral.inputText}>Porções por semana</Text>
        <TextInput style={stylesGeral.textInput} value={porcoesSemana} onChangeText={setPorcoesSemana} />

        <Text style={stylesGeral.inputText}>Quantidade de pessoas</Text>
        <TextInput style={stylesGeral.textInput} value={qtdPessoas} onChangeText={setQtdPessoas} />

        <Text style={stylesGeral.inputText}>Tipo de gás</Text>
        <TextInput style={stylesGeral.textInput} value={tipoGas} onChangeText={setTipoGas} />

        <Text style={stylesGeral.inputText}>Veículos utilizados</Text>
        <TextInput style={stylesGeral.textInput} value={veiculos} onChangeText={setVeiculos} />

        <TouchableOpacity onPress={salvarAlteracoes} style={stylesTelaRotina.botao}>
          <Text style={stylesTelaRotina.textoBotao}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={deletarRotina} style={[stylesTelaRotina.botao, { backgroundColor: "#e52f2f" }]}>
          <Text style={stylesTelaRotina.textoBotao}>Excluir Rotina</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
