import { BotaoConcluir } from "@/src/components/botaoConcluir";
import React, { useState } from "react";
import { Button, View, Text, TextInput, TouchableOpacity } from "react-native";


export default function TelaEsqueciSenha() {
  const [email, setEmail] = useState('');

  const handleLogin = () => {

    console.log("Usuário logado com sucesso!");
  };

  return (
    <View>
      <Text>Recupere sua senha</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />


      <BotaoConcluir onPress={() => console.log("Botão Concluir pressionado")} />

    </View>
  );
}
