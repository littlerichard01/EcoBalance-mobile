import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

// Definindo o que o componente pode receber
interface ProgressBarProps {
  progresso: number;  
  corFundo?: string;     
  corPreenchimento?: string; 
  altura?: number;        
  style?: ViewStyle;     
}

export function ProgressBar({ 
  progresso, 
  corFundo = "#E0E0E0", 
  corPreenchimento = "#659E43", 
  altura = 8,
  style 
}: ProgressBarProps) {
  
  // Garante que o progresso fique entre 0 e 1 para não quebrar o layout
  const porcentagem = Math.min(Math.max(progresso, 0), 1) * 100;

  return (
    <View style={[styles.container, { height: altura, backgroundColor: corFundo }, style]}>
      <View 
        style={[
          styles.fill, 
          { 
            width: `${porcentagem}%`, 
            backgroundColor: corPreenchimento 
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden", // Importante para manter o arredondamento no preenchimento
  },
  fill: {
    height: "100%",
    borderRadius: 10,
  },
});