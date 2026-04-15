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

    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: 20,
    },
    modalContent: {
        width: "100%",
        maxWidth: 380,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
        textAlign: "center",
    },
    avatarGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    avatarOption: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: "transparent",
        marginBottom: 12,
    },
    avatarOptionSelected: {
        borderColor: "#659E43",
    },
    modalCloseButton: {
        marginTop: 8,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: "#659E43",
        alignItems: "center",
    },
    modalCloseButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },

});
