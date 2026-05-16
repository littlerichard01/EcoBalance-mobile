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
    marginTop: 20
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
  inputEmailContainer: {},

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
    marginBottom: 30,
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
  inputContainer: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    boxShadow: "6px 6px 12px 0px #659E43",
    borderBottomWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  edicaoInput: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "rgb(0, 0, 0)",
    paddingRight: 10,
  },
});
