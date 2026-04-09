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
        
    },
    notificacoesApp: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: -20,
    },
    avatar: {
        borderColor: "#659E43",
        borderWidth: 5,
        borderRadius: 100,
        width: 150,
        height: 150,
    },
    inputEmailContainer: {

    },   

});