import React, { useCallback, useState } from "react";
import { View, Text, Image, FlatList, Animated } from "react-native";
import { StylesTelaConquistas } from "../../styles/telaConquistasStyles";
import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";
import { stylesTelaRotina } from "@/src/styles/telaRotinaStyle";
import { StylesTelaHome } from "@/src/styles/telaHomeStyles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { ScrollView } from "react-native-gesture-handler";
import { conquistasDef, type ConquistaDef } from "@/src/constants/conquistas";
import { buildTesteBars } from "@/src/utils/testeBars";
import { fetchConquistasMe, fetchTestesMe } from "@/src/services/meApi";
import { loadOrLogout } from "@/src/utils/loadOrLogout";

type Conquista = ConquistaDef & {
  desbloqueado: boolean;
  data?: string | null;
};


const agruparEmColunas = <T,>(data: T[], numRows: number): T[][] => {
  const colunas: T[][] = [];
  for (let i = 0; i < data.length; i += numRows) {
    colunas.push(data.slice(i, i + numRows));
  }
  return colunas;
};

export default function Conquistas() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  type NavigationProp = StackNavigationProp<RootStackParamList, "Conquistas">;
  const navigation = useNavigation<NavigationProp>();
  const [testes, setTestes] = useState<any[]>([]);
  const [conquistasUsuario, setConquistasUsuario] = useState<any[]>([]);
  const [scrollOffsetGraficos, setScrollOffsetGraficos] = useState(0);

  const carregarTestes = useCallback(() => {
    return loadOrLogout(
      navigation,
      fetchTestesMe,
      setTestes,
      "Não foi possível carregar seus testes.",
    );
  }, [navigation]);

  const carregarConquistas = useCallback(() => {
    return loadOrLogout(
      navigation,
      fetchConquistasMe,
      setConquistasUsuario,
      "Não foi possível carregar suas conquistas.",
    );
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      carregarTestes();
      carregarConquistas();
    }, [carregarTestes, carregarConquistas]),
  );

  const mapaConquistas = new Map(
    (Array.isArray(conquistasUsuario) ? conquistasUsuario : []).map((c: any) => [c?.nome, c]),
  );
  const conquistasComStatus: Conquista[] = conquistasDef.map((c) => {
    const server = mapaConquistas.get(c.nome);
    return {
      ...c,
      desbloqueado: Boolean(server?.ativa),
      data: server?.data ?? null,
    };
  });
  const dadosAgrupados = agruparEmColunas<Conquista>(conquistasComStatus, 3);

  const formatarDataRealizacao = (data: any) => {
    const date = new Date(data);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("pt-BR");
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
          const bars = buildTesteBars(item);
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
