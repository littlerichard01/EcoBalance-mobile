import { TouchableOpacity, Text } from "react-native";
import { stylesGeral } from "../styles/stylesGeral";

type BotaoCriarRotinaProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
};

export function BotaoCriarRotina({ onPress }: Readonly<BotaoCriarRotinaProps>) {
    return (
        <TouchableOpacity
            style={stylesGeral.botaoGrande}
            onPress={onPress} >
            <Text style={stylesGeral.textoBotaogrande}>+ Criar Rotina</Text>
        </TouchableOpacity>
    );
}
