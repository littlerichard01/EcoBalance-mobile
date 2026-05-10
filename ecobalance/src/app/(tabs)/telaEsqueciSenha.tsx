import { BotaoConcluir } from "@/src/components/botaoConcluir";
import { fonte } from "@/src/styles/fontes";
import { stylesGeral } from "@/src/styles/stylesGeral";
import React, { useState } from "react";
import { Button, View, Text, TextInput, TouchableOpacity } from "react-native";
import { stylesTelaEsqueciSenha } from "../../styles/telaEsqueciSenhaStyles";

export default function TelaEsqueciSenha() {
  const [email, setEmail] = useState('');

  return (
    <View style={stylesTelaEsqueciSenha.container}>
      <Text style={fonte.titulo}>Recupere sua senha</Text>

      <TextInput
        style={stylesGeral.textInput}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />


      <BotaoConcluir onPress={() => console.log("Botão Concluir pressionado")} />

    </View>
  );
}
