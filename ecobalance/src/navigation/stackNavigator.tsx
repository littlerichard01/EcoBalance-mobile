
import TelaInicial from '../app/(tabs)/telaInicial';
import TelaLogin from "../app/(tabs)/telaLogin"
import TelaCadastro from "../app/(tabs)/telaCadastro"
import TelaCarregamento from "../app/(tabs)/telaCarregamento";
import Home from "../app/(tabs)/telaHome";
import TelaRotina from "../app/(tabs)/telaRotina";
import TelaCriarRotina from "../app/(tabs)/telaCriarRotina";
import TelaCalculos from "../app/(tabs)/telaCalculos";
import TelaPerfil from "../app/(tabs)/telaPerfil";
import TelaConquistas from "../app/(tabs)/telaConquistas";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaEsqueciSenha from '../app/(tabs)/telaEsqueciSenha';
import TelaRecuperacaoSenha from '../app/(tabs)/telaRecuperacaoSenha';
import { TabNavigator } from './tabNavigator';
import ResultadoCalculo from '../app/(tabs)/telaResultado';

const Stack = createNativeStackNavigator<RootStackParamList>();



// Definindo os tipos de parâmetros para cada tela (TypeScript precisa disso para navegação tipada ocorrer corretamente)
export type RootStackParamList = {
    TelaInicial: undefined;
    TelaLogin: undefined;
    TelaCadastro: undefined;
    TelaCarregamento: undefined;

    TelaRotina: undefined;
    TelaCriarRotina: undefined;
    TelaCalculos: undefined;
    TelaPerfil: undefined;
    TelaConquistas: undefined;
    TelaEsqueciSenha: undefined;
    TelaRecuperacaoSenha: undefined;
    ResultadoCalculo: undefined;
    MainTabs: undefined;

};

// Configurando o Stack Navigator
export default function MyStack() {
    return (
        // O initialRouteName define qual tela será exibida primeiro quando o aplicativo for iniciado
        <Stack.Navigator initialRouteName="TelaCarregamento" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TelaInicial" component={TelaInicial} />
            <Stack.Screen name="TelaLogin" component={TelaLogin} />
            <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
            <Stack.Screen name="TelaCarregamento" component={TelaCarregamento} />
            <Stack.Screen name="TelaCalculos" component={TelaCalculos} />
            <Stack.Screen name="TelaConquistas" component={TelaConquistas} />
            <Stack.Screen name="TelaEsqueciSenha" component={TelaEsqueciSenha} />
            <Stack.Screen name="TelaRecuperacaoSenha" component={TelaRecuperacaoSenha} />
             <Stack.Screen name="TelaRotina" component={TelaRotina} />
            <Stack.Screen name="TelaCriarRotina" component={TelaCriarRotina} />
            <Stack.Screen name="ResultadoCalculo" component={ResultadoCalculo} />

            {/* A tela "MainTabs" é onde o Tab Navigator é renderizado, permitindo a navegação entre as abas principais do aplicativo */}
            <Stack.Screen name="MainTabs" component={TabNavigator} />


        </Stack.Navigator>
    );
}
