import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../app/(tabs)/telaHome";
import TelaPerfil from "../app/(tabs)/telaPerfil";
import TelaConquistas from "../app/(tabs)/telaConquistas";
import TelaCalculos from "../app/(tabs)/telaCalculos";
import TelaRotina from "../app/(tabs)/telaRotina";
import { Image } from 'react-native';
import { coresBase, stylesGeral } from "../styles/stylesGeral";
import { CalculoFlow, RotinaFlow } from "./stackNavigator";

const Tab = createBottomTabNavigator();

const TabIcon = ({
  source,
  focused,
  size,
}: {
  source: any;
  focused: boolean;
  size?: { width: number; height: number };
}) => {
  return (
    <Image
      source={source}
      style={[
        stylesGeral.icon,
        size ? { width: size.width, height: size.height } : null,
        { tintColor: focused ? coresBase.verdeSaturado : coresBase.verdeBebe },
      ]}
    />
  );
};

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "white",
        tabBarStyle: stylesGeral.tabBarStyle
      }}
    >
      <Tab.Screen 
  name="Calculos" 
  component={CalculoFlow} 
  options={{
    tabBarIcon: ({ focused }) => (
      <TabIcon source={require("../assets/iconCalculo.png")} focused={focused} />
    ),
  }}
/>
      <Tab.Screen 
        name="Rotina" 
        component={RotinaFlow} 
        options={{
    tabBarIcon: ({ focused }) => (
      <TabIcon
        source={require("../assets/iconRotina.png")}
        focused={focused}
        size={{ width: 42, height: 42 }}
      />
    ),
  }}
        />
      <Tab.Screen 
        name="Home" 
        component={Home} 
          options={{
    tabBarIcon: ({ focused }) => (
      <TabIcon source={require("../assets/iconMenu.png")} focused={focused} />
    ),
  }}/>
      <Tab.Screen 
        name="Conquistas" 
        component={TelaConquistas} 
          options={{
    tabBarIcon: ({ focused }) => (
      <TabIcon
        source={require("../assets/iconConquistas.png")}
        focused={focused}
        size={{ width: 38, height: 38 }}
      />
    ),
  }}/>
      <Tab.Screen 
        name="Perfil" 
        component={TelaPerfil} 
          options={{
    tabBarIcon: ({ focused }) => (
      <TabIcon
        source={require("../assets/iconPerfil.png")}
        focused={focused}
        size={{ width: 30, height: 30 }}
      />
    ),
  }}/>
      
   
    </Tab.Navigator>
  );
}
