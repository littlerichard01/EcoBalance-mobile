import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { stylesGeral } from "@/src/styles/stylesGeral";

interface TransporteSeletorProps {
  lista: string[]; // Ex: ['Carro', 'Moto']
  dados: Record<string, number>; // O estado (Map)
  onToggle: (nome: string, selecionado: boolean) => void;
  onUpdateKm: (nome: string, valor: string) => void;
  titulo?: string;
}

export default function TransporteSeletor({ 
  lista, 
  dados, 
  onToggle, 
  onUpdateKm, 
  titulo 
}: TransporteSeletorProps) {
  return (
    <View>
      {titulo && <Text>{titulo}</Text>}

      {lista.map((item) => {
        const estaAtivo = item in dados;

        return (
          <View key={item} style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
            <View style={{flexDirection: 'row', gap:20, paddingVertical: 5}}>
              <Checkbox
                value={estaAtivo}
                onValueChange={(val) => onToggle(item, val)}
                color={estaAtivo ? "#2e7d32" : undefined}
              />
              <Text style={[stylesGeral.inputText]}>{item}</Text>
            </View>

            {estaAtivo && (
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="0"
                  onChangeText={(txt) => onUpdateKm(item, txt)}
                  value={dados[item]?.toString() || "0"}
                  style={{ borderWidth: 1, borderColor: '#bbb', padding: 2, marginVertical: 2, width: 70, textAlign: 'center', borderRadius: 10, height: 40}}
                />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}