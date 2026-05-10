import { StyleSheet } from 'react-native';
import { coresBase } from './stylesGeral';

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
        marginLeft: -10,
        color: coresBase.verdeMedio,
        marginTop: 40, 
        marginBottom: 10
    },
    avancoCard: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: coresBase.verdeClaro,
        marginLeft: -20
    },
    avancoRow: {
        flexDirection: "row",
        alignItems: "stretch",
    },
    avancoAxis: {
        width: 50,
        justifyContent: "space-between",
        paddingRight: 6,
    },
    avancoAxisText: {
        fontSize: 11,
        color: coresBase.verdeEscuro,
        textAlign: "right",
        fontWeight: "500",
    },
    avancoChart: {
        height: 170,
        width: "94%",
        position: "relative",
        borderRadius: 12,
        marginLeft: 3,
        backgroundColor: coresBase.verdeBebe,
        overflow: "hidden",
    },
    avancoDot: {
        position: "absolute",
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: coresBase.verdeMedio,
    },
    avancoLine: {
        position: "absolute",
        height: 3,
        borderRadius: 3,
        backgroundColor: coresBase.verdeMedio,
    },
    avancoGridLine: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: "rgba(0,0,0,0.08)",
    },
    avancoLegenda: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingHorizontal: 22,
        marginRight: -55,
        marginLeft: 20,
    },
    avancoLegendaTexto: {
        fontSize: 12,
        color: coresBase.verdeEscuro,
        paddingLeft: 10,
        fontStyle: "italic",
    },
    graficoCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 5,
        marginRight: 12,
        borderWidth: 1,
        borderColor: coresBase.verdeClaro,
        width: 248,
        alignContent: "center",
    },
    graficoData: {
        fontSize: 13,
        marginTop: 14,
        marginBottom: 18,
        alignSelf: "center",
        color: coresBase.verdeEscuro,
        fontWeight: "500",
    },
    barrasContainer: {
        height: 170,
        width: 240,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingBottom: 6,
        borderRadius: 12,
        backgroundColor: coresBase.verdeBebe,
    },
    barraColuna: {
        width: 38,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    barra: {
        width: 22,
        borderRadius: 8,
    },
    barraLabel: {
        marginTop: 6,
        fontSize: 11,
        color: "#333",
    },
    barraValor: {
        fontSize: 10,
        color: "#333",
        marginBottom: 4,
    },
});


