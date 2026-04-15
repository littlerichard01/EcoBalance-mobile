import { fonte } from "@/src/styles/fontes";
import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { StylesTelaConquistas } from "../../styles/telaConquistasStyles";
import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";
import { stylesTelaRotina } from "@/src/styles/telaRotinaStyle";
import { StylesTelaHome } from "@/src/styles/telaHomeStyles";
import { Animated } from 'react-native';

// 1. Mova a Interface para o topo para que tudo possa usá-la
interface Conquista {
  id: number;
  titulo: string;
  descricao: string;
  imagem: any;
  desbloqueado: boolean;
}

const conquistas: Conquista[] = [
  {
    id: 1,
    titulo: "Primeiro teste",
    descricao: "Realizou seu primeiro teste de pegada de carbono",
    imagem: require("../../assets/trofeu.png"),
    desbloqueado: false,
  },
  {
    id: 2,
    titulo: "Primeira Redução",
    descricao: "Reduziu sua pegada de carbono pela primeira vez",
    imagem: require("../../assets/trofeu.png"),
    desbloqueado: false,
  },
  {
    id: 3,
    titulo: "1º Mês Sustentável",
    descricao: "Manteve uma pegada de carbono reduzida por um mês",
    imagem: require("../../assets/trofeu.png"),
    desbloqueado: false,
  },
  {
    id: 4,
    titulo: "3º Mês Sustentável",
    descricao: "Manteve uma pegada de carbono reduzida por três meses",
    imagem: require("../../assets/trofeu.png"),
    desbloqueado: false,
  },
];

const agruparEmColunas = <T,>(data: T[], numRows: number): T[][] => {
  const colunas: T[][] = [];
  for (let i = 0; i < data.length; i += numRows) {
    colunas.push(data.slice(i, i + numRows));
  }
  return colunas;
};

export default function Conquistas() {
  // 2. Chame a função de agrupamento aqui dentro
  const dadosAgrupados = agruparEmColunas<Conquista>(conquistas, 3);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={stylesGeral.telaInteira}>
      <View style={StylesTelaConquistas.cabecalho}>
        <Image
          source={require("../../assets/trofeu.png")}
          style={stylesTelaRotina.rotinaIcon}
        />
        <Text style={[stylesGeral.tituloPagina, { marginLeft: 20 }]}>
          Conquistas
        </Text>
      </View>

      <View >
  <FlatList
    horizontal
    data={dadosAgrupados}
    keyExtractor={(_, index) => `coluna-${index}`}
    showsHorizontalScrollIndicator={false}
    style={{ marginTop: 20 }}
    // Captura o movimento do scroll
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: false }
    )}
    renderItem={({ item: coluna }) => (
      <View style={{ flexDirection: "column", width: 280, marginRight: 20 }}>
        {coluna.map((item: Conquista) => (
          <View key={item.id} style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, opacity: item.desbloqueado ? 1 : 0.4 }}>
            <Image source={item.imagem} style={[StylesTelaHome.trofeuIcon, { width: 55, height: 55 }]} />
            <View style={{ flex: 1 }}>
              <Text style={[StylesTelaHome.iconeTexto, { fontSize: 14 }]}>{item.titulo}</Text>
              <Text style={{ fontSize: 12, color: "#000" }}>{item.descricao}</Text>
            </View>
          </View>
        ))}
      </View>
    )}
  />

  {/* O INDICADOR VERDE (Scroll Indicator) */}
  <View style={{              width: "100%",
                height: 8,
                backgroundColor: coresBase.verdeClaro,
                alignSelf: "center",
                borderRadius: 25,
                marginTop: 15,}}>
    <Animated.View 
      style={{
        width: "80%",
                        height: "100%",
                        backgroundColor: coresBase.verdeMedio,
                        borderRadius: 25,
        transform: [{
          translateX: scrollX.interpolate({
            inputRange: [0, 280 * (dadosAgrupados.length - 1)], // 280 é a width da sua coluna
            outputRange: [0, 100 - (100 / dadosAgrupados.length)],
            extrapolate: 'clamp'
          })
        }]
      }}
    />
  </View>


    <View style={[StylesTelaConquistas.cabecalho, {marginTop: 50}]}>
        <Image
          source={require("../../assets/trofeu.png")}
          style={stylesTelaRotina.rotinaIcon}
        />
        <Text style={[stylesGeral.tituloPagina, { marginLeft: 20 }]}>
          Gráficos:
        </Text>
      </View>

        
      </View>
    </View>
  );
}
