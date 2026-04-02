import { TouchableOpacity, Text, StyleSheet } from "react-native";

type BotaoAvancarProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
  navigation?: any;
};

export function BotaoAvancar({ onPress }: BotaoAvancarProps) {
    return (
        <TouchableOpacity
            style={styles.botaoAvancar}
            onPress={onPress}
        >
            <Text style={styles.texto}>Avançar   ❯ </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botaoAvancar: {
        backgroundColor: '#659E43',
        alignSelf: 'center',
        padding: 10,
        height: 50,
        width: '40%',
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    texto: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
