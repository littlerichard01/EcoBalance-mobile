
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
    Conquistas: undefined;
    TelaEsqueciSenha: undefined;
    TelaRecuperacaoSenha: undefined;
    ResultadoCalculo: {
        rotinaNome?: string;
        teste: {
            emissaoTotal: number;
            emissaoAlimentos: number;
            emissaoGas: number;
            emissaoVeiculos: number;
            energiaEletrica?: {
                emissao?: number;
            };
            viagem?: {
                veiculos?: {
                    emissao?: number;
                }[];
            };
            dataRealizacao?: string;
            createdAt?: string;
        };
    };
    MainTabs: { screen: keyof RootStackParamList } | undefined;
    

};

const CalculoStack = createNativeStackNavigator<RootStackParamList>();

export function CalculoFlow() {
    return (
        <CalculoStack.Navigator screenOptions={{ headerShown: false }}>
            {/* Esta será a tela inicial da aba de cálculos */}
            <CalculoStack.Screen name="TelaCalculos" component={TelaCalculos} />
            <CalculoStack.Screen name="ResultadoCalculo" component={ResultadoCalculo} />
        </CalculoStack.Navigator>
    );
}

const RotinaStack = createNativeStackNavigator<RootStackParamList>();

export function RotinaFlow() {
    return (
        <RotinaStack.Navigator screenOptions={{ headerShown: false }}>
            {/* Esta será a tela inicial da aba de rotinas */}
            <RotinaStack.Screen name="TelaRotina" component={TelaRotina} />
            <RotinaStack.Screen name="TelaCriarRotina" component={TelaCriarRotina} />
        </RotinaStack.Navigator>
    );
}

// Configurando o Stack Navigator
export default function MyStack() {
    return (
        // O initialRouteName define qual tela será exibida primeiro quando o aplicativo for iniciado
        <Stack.Navigator initialRouteName="TelaCarregamento" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TelaInicial" component={TelaInicial} />
            <Stack.Screen name="TelaLogin" component={TelaLogin} />
            <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
            <Stack.Screen name="TelaCarregamento" component={TelaCarregamento} />
            <Stack.Screen name="TelaEsqueciSenha" component={TelaEsqueciSenha} />
            <Stack.Screen name="TelaRecuperacaoSenha" component={TelaRecuperacaoSenha} />

            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="Conquistas" component={TelaConquistas} />

            {/* A tela "MainTabs" é onde o Tab Navigator é renderizado, permitindo a navegação entre as abas principais do aplicativo */}
        


        </Stack.Navigator>
    );
}
