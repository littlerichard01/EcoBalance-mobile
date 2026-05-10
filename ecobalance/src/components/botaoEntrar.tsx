import { TouchableOpacity, Text, StyleSheet } from "react-native";

type BotaoEntrarProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
};

export function BotaoEntrar({ onPress }: Readonly<BotaoEntrarProps>) {
    return (
        <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={onPress}
        >
            <Text style={styles.texto}>Entrar</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botaoEntrar: {
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
