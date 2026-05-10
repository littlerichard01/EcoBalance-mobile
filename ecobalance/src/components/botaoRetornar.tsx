import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { coresBase } from "../styles/stylesGeral";

type BotaoRetornarProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
};

export function BotaoRetornar({ onPress }: Readonly<BotaoRetornarProps>) {
    return (
            <TouchableOpacity
                style={styles.voltarContainer}
                onPress={onPress}
            >
                <Image
                source={require('../assets/iconVoltar.png')}
                style={styles.imagemVoltar}/>
            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imagemVoltar:{
        tintColor: coresBase.verdeMedio,
        width: 28,
        height: 28
     },
     voltarContainer: {
        width: 45, 
        height: 45,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: coresBase.verdeMedio,
        alignItems: 'center',    
        justifyContent: 'center', 
        backgroundColor: 'transparent',
        marginRight: 15
     }
});
