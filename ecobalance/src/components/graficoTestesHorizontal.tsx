import React, { useState } from "react";
import type { StyleProp, ViewStyle, DimensionValue } from "react-native";
import { FlatList, Text, View } from "react-native";
import { coresBase } from "@/src/styles/stylesGeral";
import { StylesTelaHome } from "@/src/styles/telaHomeStyles";
import { buildTesteBars } from "@/src/utils/testeBars";
import { formatarDataPtBr } from "@/src/utils/dateFormat";

type Props = Readonly<{
  testes: any[];
  indicadorLarguraFator?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  marginBottom?: number;
  larguraCard?: DimensionValue;
  vertical?: boolean;
}>;

export function GraficoTestesHorizontal({
  testes,
  indicadorLarguraFator = 0.4,
  contentContainerStyle,
  marginBottom = 15,
  larguraCard = 300,
  vertical = false,
}: Props) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);

  const indicadorWidth = Math.max(trackWidth * indicadorLarguraFator, 1);
  const indicadorLeft = scrollOffset * Math.max(trackWidth - indicadorWidth, 0);

  return (
    <>
      <FlatList
        contentContainerStyle={[
          { paddingVertical: 5 },
          vertical && { alignItems: "center" },
          contentContainerStyle
        ]}
        style={{ flexGrow: 0, marginTop: 10 }}
        nestedScrollEnabled={true}
        data={testes}
        horizontal={!vertical}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        keyExtractor={(item, index) => {
          const raw = item?._id || item?.id || item?.dataRealizacao || item?.createdAt || index;
          return String(raw);
        }}
        onScroll={(event) => {
          const totalWidth =
            event.nativeEvent.contentSize.width -
            event.nativeEvent.layoutMeasurement.width;
          const currentPos = event.nativeEvent.contentOffset.x;
          setScrollOffset(totalWidth > 0 ? currentPos / totalWidth : 0);
        }}
        renderItem={({ item }) => {
          const bars = buildTesteBars(item);
          const alturaMax = 112;

          return (
            <View style={[
              StylesTelaHome.graficoCard, 
              { 
                width: vertical ? "90%" : larguraCard, 
                marginRight: vertical ? 0 : 15, 
                marginBottom 
              }
            ]}>
              <View style={[StylesTelaHome.barrasContainer, { width: "100%", flexDirection: "row", justifyContent: "space-around" }]}>
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
              <Text style={[StylesTelaHome.graficoData, { marginBottom: -5 }]}>
                {formatarDataPtBr(item?.dataRealizacao || item?.createdAt)}
              </Text>
            </View>
          );
        }}
      />
    </>
  );
}