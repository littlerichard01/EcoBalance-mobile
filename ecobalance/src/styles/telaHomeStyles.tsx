import { StyleSheet } from 'react-native';
import { coresBase, stylesGeral } from './stylesGeral';

export const StylesTelaHome = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    avatar: {
        width: 70,
        height: 70,
        borderWidth: 3,
        borderColor: coresBase.verdeMedio,
        borderRadius: 50,
        marginRight: 15,
    },
    cabecalho: {
        marginTop: 10,
        flexDirection: "row",
        marginBottom: 20,
    },
    titulo: {
        fontSize: 26,
        fontFamily: "Jost-Bold",
        fontWeight: 900,
        color: coresBase.verdeMedio
    },
    olaTitulo: {
        fontSize: 16,
        fontFamily: "Jost-Bold",
        fontWeight: 600,
        color: coresBase.verdeMedio,
        marginTop: 4,
        marginBottom: 5,
        fontStyle: "italic"
    },
    trofeuIcon: {
        width: 60, 
        height: 60, 
        marginRight: 20,
        alignSelf: "center",
    },
    iconeTexto: { 
        fontWeight: "500",
        marginRight: 20, 
        marginTop: 10, 
        fontSize: 13 
    },
    subtitulo: {
        fontSize: 24,
        fontFamily: "Jost-Bold",
        fontWeight: 900,
        color: coresBase.verdeMedio,
        marginTop: 30, 
        marginBottom: 15
    }
});


