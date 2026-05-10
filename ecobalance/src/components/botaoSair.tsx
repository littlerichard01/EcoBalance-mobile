import { TouchableOpacity, Text, StyleSheet } from "react-native";

type BotaoSairProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
    onPress: () => void; // A função onPress é do tipo "função que não recebe argumentos e não retorna nada"
};

export function BotaoSair({ onPress }: Readonly<BotaoSairProps>) {
    return (
        <TouchableOpacity
            style={styles.botaoSair}
            onPress={onPress}
        >
            <Text style={styles.texto}>Sair</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botaoSair: {
        backgroundColor: '#659E43',
        alignSelf: 'center',
        padding: 10,
        height: 50,
        width: '70%',
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    texto: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});
