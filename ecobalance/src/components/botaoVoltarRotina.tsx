import { TouchableOpacity, Text, StyleSheet } from "react-native";

type BotaoRetornarProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
};

export function BotaoVoltar({ onPress }: Readonly<BotaoRetornarProps>) {
    return (
            <TouchableOpacity
                style={styles.voltarContainer}
                onPress={onPress}
            >
                <Text style={styles.texto}>❮   Voltar</Text>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

     voltarContainer: {
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
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
