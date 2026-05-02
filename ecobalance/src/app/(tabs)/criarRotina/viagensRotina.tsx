import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import TransporteSeletor from "./transporte";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { parseNonNegativeNumber } from "@/src/utils/numericInput";

export default function ViagemRotina({ calculoData, updateCalculo }: any) {
  const viagem = calculoData.viagem;
  const fezViagem = viagem.fezViagem;
  const internacional = viagem.internacional;
  const kmViagens = viagem.veiculos.reduce((acc: Record<string, number>, veiculo: any) => {
    acc[veiculo.tipo] = veiculo.km;
    return acc;
  }, {});

  const opcoesVeiculos = [
    'Carro', 'Carro elétrico', 'Moto', 'Ônibus', 
    'Metrô', 'Trem', 'Avião', 'Barco/cruzeiro'
  ];

  const toggleVeiculo = (nome: string, selecionado: boolean) => {
    const veiculosAtualizados = selecionado
      ? [...viagem.veiculos, { tipo: nome, km: 0 }]
      : viagem.veiculos.filter((veiculo: any) => veiculo.tipo !== nome);

    updateCalculo('viagem', {
      ...viagem,
      veiculos: veiculosAtualizados
    });
  };

  const atualizarKm = (nome: string, val: string) => {
    const veiculosAtualizados = viagem.veiculos.map((veiculo: any) =>
      veiculo.tipo === nome
        ? { ...veiculo, km: parseNonNegativeNumber(val) }
        : veiculo
    );

    updateCalculo('viagem', {
      ...viagem,
      veiculos: veiculosAtualizados
    });
  };

  return (
    <ScrollView>
      <Text style={stylesGeral.subTituloPagina}>
        Fale brevemente das viagens realizadas no último mês
      </Text>

      <View style={{marginBottom: 20}}>
        <Text style={stylesGeral.inputText}>Fez alguma viagem no último mês?</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <TouchableOpacity 
            onPress={() => updateCalculo('viagem', { ...viagem, fezViagem: true })}
            style={{
              padding: 10,
              backgroundColor: fezViagem === true ? '#2e7d32' : '#ccc',
              borderRadius: 5, flex: 1, alignItems: 'center'
            }}
          >
            <Text style={{ color: fezViagem === true ? '#fff' : '#000' }}>SIM</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => { 
              updateCalculo('viagem', {
                fezViagem: false,
                internacional: false,
                veiculos: []
              });
            }}
            style={{
              padding: 10,
              backgroundColor: fezViagem === false ? '#2e7d32' : '#ccc',
              borderRadius: 5, flex: 1, alignItems: 'center'
            }}
          >
            <Text style={{ color: fezViagem === false ? '#fff' : '#000' }}>NÃO</Text>
          </TouchableOpacity>
        </View>
      </View>

      {fezViagem === true && (
        <View style={{ marginBottom: 20 }}>
          <Text style={[stylesGeral.inputText, {marginBottom:10}]}>Foi uma viagem internacional?</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity 
              onPress={() => updateCalculo('viagem', { ...viagem, internacional: true })}
              style={{
                padding: 10,
                backgroundColor: internacional === true ? '#2e7d32' : '#ccc',
                borderRadius: 5, flex: 1, alignItems: 'center'
              }}
            >
              <Text style={{ color: internacional === true ? '#fff' : '#000' }}>SIM</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => updateCalculo('viagem', { ...viagem, internacional: false })}
              style={{
                padding: 10,
                backgroundColor: internacional === false ? '#2e7d32' : '#ccc',
                borderRadius: 5, flex: 1, alignItems: 'center'
              }}
            >
              <Text style={{ color: internacional === false ? '#fff' : '#000' }}>NÃO</Text>
            </TouchableOpacity>
          </View>

            <View style={{ marginTop: 20 }}>
              <Text style={[stylesGeral.inputText, {marginBottom: 10}]}>
                Qual (ou quais) veículos você utilizou para viajar?
              </Text>
              <TransporteSeletor
                lista={opcoesVeiculos} 
                dados={kmViagens}
                onToggle={toggleVeiculo}
                onUpdateKm={atualizarKm}
              />
            </View>
        </View>
      )}
      
    </ScrollView>
  );
}
