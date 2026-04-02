import { StyleSheet } from "react-native";
import { BotaoAvancar } from "../components/botaoAvancar";


export const coresBase = {
    verdeMedio: '#659E43',
    verdeEscuro: '#255f27',
    verdeClaro: '#f9fff9',
    cinza: '#D9D9D9',
    verdeBebe: '#f3faef',
    verdeSaturado: '#2a6906'
}

export const stylesGeral = StyleSheet.create({
    icon: {
       width: 34, 
        height: 34
    },

    tabBarStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#a7c596", // cor de fundo da barra
        height: 100,
        paddingTop: 15,                // altura da barra
        borderTopLeftRadius: 10,    // arredondar cantos
        borderTopRightRadius: 10,
    },

    textInput : {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 100,
        marginBottom: 15,
    },

    telaInteira: {
        paddingHorizontal: 28,
        paddingTop: 70,
        paddingBottom: 20,
        flex: 1,
        backgroundColor: coresBase.verdeClaro,
    },
    tituloPagina: {
        marginTop: -6,
        fontSize: 35,
        fontFamily: "Jost-Bold",
        fontWeight: 900,
        color: coresBase.verdeEscuro
    },

    subTituloPagina: {
        fontFamily: "Jost-bold",
        fontSize: 18,
        marginTop: 15,
        marginLeft: 5,
        color: coresBase.verdeMedio,
        fontWeight: 600,
        marginBottom: 20
    },

    botaoGrande: {
        backgroundColor: coresBase.verdeMedio,
        alignSelf: 'center',
        padding: 10,
        width: '100%',
        height: 55,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    textoBotaogrande: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Jost-Bold',
        fontSize: 20
    },
    passosTexto:{
        fontFamily: "Jost-bold",
        fontSize: 15,
        marginTop: 20,
        color: coresBase.verdeMedio,
        fontWeight: 600,
    },
    containerPassosTexto: {
        paddingHorizontal: 2,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },

    inputText: {
        fontFamily: "Jost-bold",
        fontSize: 15,
    },

    input2: {
        height: 50,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        boxShadow: '6px 6px 12px 0px #659E43',
    }

});