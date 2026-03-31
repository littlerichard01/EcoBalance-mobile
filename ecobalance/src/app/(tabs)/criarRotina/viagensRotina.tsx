      
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import TransporteSeletor from "./transporte";

export default function ViagemRotina() {
  const [fezViagem, setFezViagem] = useState<boolean | null>(null);
  const [internacional, setInternacional] = useState<boolean | null>(null);
  
  // Alterado para Record para ser compatível com o TransporteSeletor
  const [kmViagens, setKmViagens] = useState<Record<string, number>>({});

  // Lista baseada exatamente no enum da sua Model (respeitando acentos)
  const opcoesVeiculos = [
    'Carro', 'Carro elétrico', 'Moto', 'Ônibus', 
    'Metrô', 'Trem', 'Avião', 'Barco/cruzeiro'
  ];

  const toggleVeiculo = (nome: string, selecionado: boolean) => {
    setKmViagens(prev => {
      const novo = { ...prev };
      if (selecionado) {
        novo[nome] = 0;
      } else {
        delete novo[nome];
      }
      return novo;
    });
  };

  const atualizarKm = (nome: string, val: string) => {
    setKmViagens(prev => ({
      ...prev,
      [nome]: parseFloat(val) || 0
    }));
  };

  // Função para preparar os dados para o MongoDB (Converte Map para Array)
  const salvarDados = () => {
    const veiculosParaBanco = Object.entries(kmViagens).map(([tipo, km]) => ({
      tipo,
      km,
      emissao: km * 0.12 // Fator de exemplo
    }));

    const payload = {
      viagem: {
        fezViagem,
        internacional,
        veiculos: veiculosParaBanco
      }
    };
    console.log("Enviando ao Banco:", payload);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Fale brevemente das viagens realizadas no último mês
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text>Fez alguma viagem no último mês?</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <TouchableOpacity 
            onPress={() => setFezViagem(true)}
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
              setFezViagem(false); 
              setInternacional(null);
              setKmViagens({}); 
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
          <Text style={{ marginBottom: 10 }}>Foi uma viagem internacional?</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity 
              onPress={() => setInternacional(true)}
              style={{
                padding: 10,
                backgroundColor: internacional === true ? '#2e7d32' : '#ccc',
                borderRadius: 5, flex: 1, alignItems: 'center'
              }}
            >
              <Text style={{ color: internacional === true ? '#fff' : '#000' }}>SIM</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setInternacional(false)}
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
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
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