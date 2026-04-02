import { StyleSheet } from "react-native";
import { coresBase } from "./stylesGeral";

export const stylesTelaCriarRotina = StyleSheet.create({
    telaInteira:{
        paddingHorizontal: 28,
        paddingTop: 70,
        paddingBottom: 20,
        flex: 1,
        backgroundColor: coresBase.verdeClaro,
        height: '100%',
        width: '100%'
    },
    botaoAvancar: {
        position: 'absolute',
  bottom: 0,    
  left: 0,     
  right: 0,  
  
  height: 80, 
  backgroundColor: coresBase.verdeEscuro,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
  elevation: 10,
    },
    cabecario:{
        alignItems: 'center', 
        marginBottom: 10,
        flexDirection: 'row',
    },
    containerInput: {
        marginTop: 20,
        gap: 10,    
        marginLeft: 8  
    }
});