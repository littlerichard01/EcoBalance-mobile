import { RootStackParamList } from "./types"
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

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function MyStack() {
    return (
        <Stack.Navigator initialRouteName="TelaInicial" screenOptions={{ headerShown: true }}>
            <Stack.Screen name="TelaInicial" component={TelaInicial} />
            <Stack.Screen name="TelaLogin" component={TelaLogin} />
            <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
            <Stack.Screen name="TelaCarregamento" component={TelaCarregamento} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="TelaRotina" component={TelaRotina} />
            <Stack.Screen name="TelaCriarRotina" component={TelaCriarRotina} />
            <Stack.Screen name="TelaCalculos" component={TelaCalculos} />
            <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
            <Stack.Screen name="TelaConquistas" component={TelaConquistas} />

        </Stack.Navigator>
    );
}
