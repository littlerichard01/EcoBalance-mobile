import { StyleSheet } from 'react-native';

export const stylesTelaInicial = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    alignContent: "center",
    
  },
  imagem: {
    width: 500,
    height: 350,
    resizeMode: "contain",
    marginBottom: 20,
  },

  linkTenhoConta: {
    marginTop: 20,
    color: "#659E43",
    fontSize: 16,
    fontWeight: "bold",
   textDecorationLine: "underline",
  }
})
