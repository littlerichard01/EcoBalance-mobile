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
import { fetchConquistasMe, fetchTestesMe } from "@/src/services/meApi";
import { loadOrLogout } from "@/src/utils/loadOrLogout";
import { GraficoTestesHorizontal } from "@/src/components/graficoTestesHorizontal";

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
    (Array.isArray(conquistasUsuario) ? conquistasUsuario : []).map(
      (c: any) => [c?.nome, c],
    ),
  );
  const conquistasComStatus: Conquista[] = conquistasDef.map((c) => {
    const server = mapaConquistas.get(c.nome);
    return {
      ...c,
      desbloqueado: Boolean(server?.ativa),
      data: server?.data ?? null,
    };
  });

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

      <FlatList
        data={conquistasComStatus}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start", // Alinha todos à esquerda
          paddingHorizontal: 10,
        }}
        style={{ height: "65%", paddingVertical: 10, }}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View
            style={{
              width: "30%",
              alignItems: "center",
              opacity: item.desbloqueado ? 1 : 0.4,
              marginBottom: 25,
              marginHorizontal: "1.9%",
            }}
          >
            <Image
              source={item.imagem}
              style={[StylesTelaHome.trofeuIcon, { width: 90, height: 90 }]}
            />
            <View style={{ alignItems: "center", width: "100%" }}>
              <Text
                style={[
                  StylesTelaHome.iconeTexto,
                  { fontSize: 14, textAlign: "center" },
                ]}
              >
                {item.titulo}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={[StylesTelaConquistas.cabecalho, { marginTop: 30 }]}>
        {" "}
        <View
          style={[
            stylesTelaRotina.rotinaIconContainer,
            { width: 50, height: 50 },
          ]}
        >
          <Image
            source={require("../../assets/icongrafico.png")}
            style={[stylesTelaRotina.rotinaIcon, { width: 35, height: 35 }]}
          />
        </View>
        <Text style={stylesGeral.tituloPagina}>Gráficos:</Text>
      </View>

      <GraficoTestesHorizontal
        testes={testes}
        marginBottom={10}
        vertical={true}
      />
    </View>
  );
}
