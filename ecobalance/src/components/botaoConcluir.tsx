import { TouchableOpacity, Text, StyleSheet } from "react-native";

type BotaoConcluirProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
};

export function BotaoConcluir({ onPress }: Readonly<BotaoConcluirProps>) {
    return (
        <TouchableOpacity
            style={styles.botaoConcluir}
            onPress={onPress}
        >
            <Text style={styles.texto}>Concluir</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botaoConcluir: {
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
