import { TouchableOpacity, Text, StyleSheet } from "react-native";

type BotaoCalcularProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
};

export function BotaoCalcular({ onPress }: Readonly<BotaoCalcularProps>) {
    return (
        <TouchableOpacity
            style={styles.botaoCalcular}
            onPress={onPress}
        >
            <Text style={styles.texto}>Calcular</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botaoCalcular: {
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
