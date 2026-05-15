import { StyleSheet } from "react-native";
import { coresBase } from "./stylesGeral";

export const stylesTelaRotina = StyleSheet.create({
  cabecarioTela: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
  },
  rotinaIcon: {
    width: 50,
    height: 50,
    tintColor: coresBase.verdeMedio,
  },
  rotinaIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: coresBase.verdeMedio,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginRight: 15,
  },
  rotinaIconUnitario: {
    width: 68,
    height: 68,
    tintColor: coresBase.verdeMedio,
  },
  rotinaIconContainerUnitario: {
    width: 84,
    height: 84,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: coresBase.verdeMedio,
    alignItems: "center",
    backgroundColor: coresBase.verdeBebe,
    justifyContent: "center",
    marginRight: 15,
  },
  editIcon: {
    width: 24,
    height: 24,
    tintColor: coresBase.verdeBebe,
    alignSelf: "center",
  },
  editIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: coresBase.verdeMedio,
    borderRadius: 20,
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    right: -45,
    top: -30,
  },
  containerRotinaUnitario: {
    position: "relative",
  },
  textoRotinaNome: {
    marginTop: 10,
    fontSize: 14,
    marginRight: 9,
    fontWeight: "bold",
    color: coresBase.verdeMedio,
    alignSelf: "center",
  },
  rotinaTitulo: {
    fontSize: 22,
    fontWeight: "600",
    color: coresBase.verdeMedio,
    marginTop: 20,
    marginBottom: 30,
    alignSelf: "center",

  }
});
