import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { coresBase } from "../styles/stylesGeral";
import { Image } from "react-native";

type BotaoRetornarProps = { // Define os tipos de props que o componente espera. Assim, quando alguém usar o BotaoConcluir, o TypeScript vai garantir que a função onPress seja passada corretamente.
  onPress: () => void;
  navigation?: any;
};

export function BotaoRetornar({ onPress }: BotaoRetornarProps) {
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
