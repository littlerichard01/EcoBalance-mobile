import { StyleSheet } from "react-native";

export const stylesTelaPerfil = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    cabecalho: {
        flexDirection: "row",
        alignItems: "center",   
},
    notificacoesEmail: {
        flexDirection: "row",
        justifyContent: "space-between",   
        alignItems: "center",
        marginBottom: 20,
    },
    notificacoesApp: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
});