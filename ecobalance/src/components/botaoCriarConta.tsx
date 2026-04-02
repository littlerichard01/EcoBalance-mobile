import { TouchableOpacity, Text, StyleSheet } from "react-native";

type BotaoCriarContaProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
  navigation?: any;
};

export function BotaoCriarConta({ onPress }: BotaoCriarContaProps) {
    return (
        <TouchableOpacity
            style={styles.BotaoCriarConta}
            onPress={onPress}
        >
            <Text style={styles.texto}>Criar Conta</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    BotaoCriarConta: {
        backgroundColor: '#659E43',
        alignSelf: 'center',
        paddingTop: 12,
        padding: 10,
        height: 50,
        width: '70%',
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    texto: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
