import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../app/(tabs)/telaHome";
import TelaPerfil from "../app/(tabs)/telaPerfil";
import TelaConquistas from "../app/(tabs)/telaConquistas";
import TelaCalculos from "../app/(tabs)/telaCalculos";
import TelaRotina from "../app/(tabs)/telaRotina";
import { Image } from 'react-native';
import { coresBase, stylesGeral } from "../styles/stylesGeral";
import { CalculoFlow } from "./stackNavigator";

const Tab = createBottomTabNavigator();

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
      <Image
        source={require("../assets/iconCalculo.png")} 
        style={[
          stylesGeral.icon,
          { tintColor: focused ? coresBase.verdeSaturado : coresBase.verdeBebe }
        ]}
      />
    )
  }}
/>
      <Tab.Screen 
        name="Rotina" 
        component={TelaRotina} 
        options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={require("../assets/iconRotina.png")} 
        style={[
          stylesGeral.icon,
          { tintColor: focused ? coresBase.verdeSaturado : coresBase.verdeBebe },
          {width: 42, height: 42}
        ]}
      />
    )
  }}
        />
      <Tab.Screen 
        name="Home" 
        component={Home} 
          options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={require("../assets/iconMenu.png")} 
        style={[
          stylesGeral.icon,
          { tintColor: focused ? coresBase.verdeSaturado : coresBase.verdeBebe }
        ]}
      />
    )
  }}/>
      <Tab.Screen 
        name="Conquistas" 
        component={TelaConquistas} 
          options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={require("../assets/iconConquistas.png")} 
        style={[
          stylesGeral.icon,
          { tintColor: focused ? coresBase.verdeSaturado : coresBase.verdeBebe },
          {width: 38, height: 38}
        ]}
      />
    )
  }}/>
      <Tab.Screen 
        name="Perfil" 
        component={TelaPerfil} 
          options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={require("../assets/iconPerfil.png")} 
        style={[
          stylesGeral.icon,
          { width: 30
            , height: 30 },
          { tintColor: focused ? coresBase.verdeSaturado : coresBase.verdeBebe }
        ]}
      />
    )
  }}/>
      
   
    </Tab.Navigator>
  );
}
