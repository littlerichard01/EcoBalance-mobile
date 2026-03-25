import React from "react";
import { Button } from "react-native";

type BotaoConcluirProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
  navigation?: any;
};

// Nessa estrutura, o botao pode ser reutilizado em várias telas, e a ação a ser executada quando o botão for pressionado pode ser personalizada através da prop onPress. Isso torna o componente mais flexível e fácil de manter.

export function BotaoConcluir({ onPress }: BotaoConcluirProps) {
  return (
    <Button
      title="Concluir"
      onPress={onPress}
    />
  );
}
