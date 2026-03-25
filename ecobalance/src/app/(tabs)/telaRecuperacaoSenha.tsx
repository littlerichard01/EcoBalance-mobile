import { BotaoConcluir } from "@/src/components/botaoConcluir";
import React, { useState } from "react";
import { Button, View, Text, TextInput, TouchableOpacity } from "react-native";


export default function TelaRecuperacaoSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState(''); 

  return (
    <View>
      <Text>Cadastre sua nova senha</Text>

      <TextInput
        placeholder="Nova senha"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
      />

      <TextInput
        placeholder="Confirmar nova senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <BotaoConcluir onPress={() => console.log("Botão Concluir pressionado")} />

    </View>
  );
}
