import { TouchableOpacity, Text, StyleSheet } from "react-native";

type BotaoCriarRotinaProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
  navigation?: any;
};

export function BotaoCriarRotina({ onPress }: BotaoCriarRotinaProps) {
    return (
        <TouchableOpacity
            style={styles.BotaoCriarRotina}
            onPress={onPress} >
            <Text style={styles.texto}>Criar Rotina</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    BotaoCriarRotina: {
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
