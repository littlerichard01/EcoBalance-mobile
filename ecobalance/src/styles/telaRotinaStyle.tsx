import { StyleSheet } from 'react-native';
import { coresBase } from './stylesGeral';

export const stylesTelaRotina = StyleSheet.create({
    cabecarioTela: {
        alignItems: 'center', 
        marginBottom: 20,
        flexDirection: 'row',      
    },
    rotinaIcon:{
        width: 50, 
        height: 50,
        tintColor: coresBase.verdeMedio,
    },
    rotinaIconContainer: {
        width: 60, 
        height: 60,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: coresBase.verdeMedio,
        alignItems: 'center',    
        justifyContent: 'center', 
        backgroundColor: 'transparent',
        marginRight: 15
    },

});


