import React, { useCallback, useState } from "react";
import { View, Text, Image, FlatList, Alert } from "react-native";
import { StylesTelaConquistas } from "../../styles/telaConquistasStyles";
import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";
import { stylesTelaRotina } from "@/src/styles/telaRotinaStyle";
import { StylesTelaHome } from "@/src/styles/telaHomeStyles";
import { Animated } from 'react-native';
import api from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { ScrollView } from "react-native-gesture-handler";

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [testes, setTestes] = useState<any[]>([]);
  const [scrollOffsetGraficos, setScrollOffsetGraficos] = useState(0);

  const carregarTestes = useCallback(async () => {
    try {
      const response = await api.get("/testes/me");
      setTestes(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401) {
        await AsyncStorage.removeItem("@EcoBalance:token");
        navigation.navigate("TelaCarregamento" as never);
        return;
      }

      Alert.alert("Erro", "Não foi possível carregar seus testes.");
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      carregarTestes();
    }, [carregarTestes]),
  );

  const formatarDataRealizacao = (data: any) => {
    const date = new Date(data);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("pt-BR");
  };

  const buildBars = (teste: any) => {
    const alimentos = Number(teste?.emissaoAlimentos) || 0;
    const gas = Number(teste?.emissaoGas) || 0;
    const veiculosTotal = Number(teste?.emissaoVeiculos) || 0;
    const energia = Number(teste?.energiaEletrica?.emissao) || 0;
    const viagens = Array.isArray(teste?.viagem?.veiculos)
      ? teste.viagem.veiculos.reduce((acc: number, v: any) => {
          return acc + (Number(v?.emissao) || 0);
        }, 0)
      : 0;
    const veiculosRotina = Math.max(veiculosTotal - viagens, 0);
    const max = Math.max(alimentos, gas, veiculosRotina, viagens, energia, 1);

    return [
      { key: "Alim", label: "Alim", value: alimentos, color: coresBase.verdeMedio, max },
      { key: "Gás", label: "Gás", value: gas, color: "#4C9F70", max },
      { key: "Veíc", label: "Veíc", value: veiculosRotina, color: "#2C6E49", max },
      { key: "Viag", label: "Viag", value: viagens, color: "#1B4332", max },
      { key: "Ener", label: "Ener", value: energia, color: "#8BC34A", max },
    ];
  };
  

  return (
    <ScrollView style={stylesGeral.telaInteira}>
      <View style={StylesTelaConquistas.cabecalho}>
        <Image
          source={require("../../assets/trofeu.png")}
          style={stylesTelaRotina.rotinaIcon}
        />
        <Text style={[stylesGeral.tituloPagina, { marginLeft: 20 }]}>
          Conquistas
        </Text>
      </View>

      <FlatList
        horizontal
        data={dadosAgrupados}
        keyExtractor={(_, index) => `coluna-${index}`}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        renderItem={({ item: coluna }) => (
          <View style={{ flexDirection: "column", width: 280, marginRight: 20 }}>
            {coluna.map((item: Conquista) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  opacity: item.desbloqueado ? 1 : 0.4,
                }}
              >
                <Image
                  source={item.imagem}
                  style={[StylesTelaHome.trofeuIcon, { width: 55, height: 55 }]}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[StylesTelaHome.iconeTexto, { fontSize: 14 }]}>
                    {item.titulo}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#000" }}>
                    {item.descricao}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      />

      <View
        style={{
          width: "100%",
          height: 8,
          backgroundColor: coresBase.verdeClaro,
          alignSelf: "center",
          borderRadius: 25,
          marginTop: 15,
        }}
      >
        <Animated.View
          style={{
            width: "80%",
            height: "100%",
            backgroundColor: coresBase.verdeMedio,
            borderRadius: 25,
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [0, 280 * (dadosAgrupados.length - 1)],
                  outputRange: [0, 100 - 100 / dadosAgrupados.length],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        />
      </View>

      <View style={[StylesTelaConquistas.cabecalho, { marginTop: 50 }]}>
        <View
          style={[stylesTelaRotina.rotinaIconContainer, { width: 50, height: 50 }]}
        >
          <Image
            source={require("../../assets/icongrafico.png")}
            style={[stylesTelaRotina.rotinaIcon, { width: 35, height: 35 }]}
          />
        </View>
        <Text style={stylesGeral.tituloPagina}>Gráficos:</Text>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 10,
          marginTop: 15
        }}
        horizontal={true}
        data={testes}
        keyExtractor={(item, index) => (item?._id || item?.id || index).toString()}
        onScroll={(event) => {
          const totalWidth =
            event.nativeEvent.contentSize.width -
            event.nativeEvent.layoutMeasurement.width;
          const currentPos = event.nativeEvent.contentOffset.x;
          setScrollOffsetGraficos(totalWidth > 0 ? currentPos / totalWidth : 0);
        }}
        renderItem={({ item }) => {
          const bars = buildBars(item);
          const alturaMax = 112;

          return (
            <View style={StylesTelaHome.graficoCard}>
              <View style={StylesTelaHome.barrasContainer}>
                {bars.map((b) => {
                  const height = Math.max(6, (b.value / b.max) * alturaMax);
                  return (
                    <View key={b.key} style={StylesTelaHome.barraColuna}>
                      <Text style={StylesTelaHome.barraValor}>
                        {b.value.toFixed(1)}
                      </Text>
                      <View
                        style={[
                          StylesTelaHome.barra,
                          { height, backgroundColor: b.color },
                        ]}
                      />
                      <Text style={StylesTelaHome.barraLabel}>{b.label}</Text>
                    </View>
                  );
                })}
              </View>
                            <Text style={StylesTelaHome.graficoData}>
                {formatarDataRealizacao(item?.dataRealizacao || item?.createdAt)}
              </Text>
            </View>
          );
        }}
      />

      <View
        style={{
          width: "100%",
          height: 9,
          backgroundColor: coresBase.verdeClaro,
          alignSelf: "center",
          borderRadius: 25,
          marginBottom: 100,
        }}
      >
        <View
          style={{
            width: "80%",
            height: "100%",
            backgroundColor: coresBase.verdeMedio,
            borderRadius: 25,
            marginLeft: scrollOffsetGraficos * 70,

          }}
        />
      </View>
    </ScrollView>
  );
}
