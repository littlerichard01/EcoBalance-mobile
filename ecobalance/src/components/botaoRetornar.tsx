import { TouchableOpacity, Text, StyleSheet } from "react-native";

type BotaoRetornarProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
  navigation?: any;
};

export function BotaoRetornar({ onPress }: BotaoRetornarProps) {
    return (
        <TouchableOpacity
            style={styles.botaoRetornar}
            onPress={onPress}
        >
            <Text style={styles.texto}>Retornar</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botaoRetornar: {
        backgroundColor: '#659E43',
        alignSelf: 'center',
        padding: 10,
        width: '50%',
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    texto: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
