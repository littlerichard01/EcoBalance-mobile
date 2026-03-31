import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

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
          <View key={item}>
            <View>
              <Checkbox
                value={estaAtivo}
                onValueChange={(val) => onToggle(item, val)}
                color={estaAtivo ? "#2e7d32" : undefined}
              />
              <Text>{item}</Text>
            </View>

            {estaAtivo && (
              <View>
                <Text>Distância em KM:</Text>
                <TextInput
                  keyboardType="numeric"
                  placeholder="0"
                  onChangeText={(txt) => onUpdateKm(item, txt)}
                  value={dados[item]?.toString() || "0"}
                />
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}