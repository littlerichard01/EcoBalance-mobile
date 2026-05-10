import React, { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
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
}>;

export function GraficoTestesHorizontal({
  testes,
  indicadorLarguraFator = 0.4,
  contentContainerStyle,
  marginBottom = 100,
}: Props) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);

  const indicadorWidth = Math.max(trackWidth * indicadorLarguraFator, 1);
  const indicadorLeft = scrollOffset * Math.max(trackWidth - indicadorWidth, 0);

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        horizontal={true}
        data={testes}
        keyExtractor={(item, index) => {
          const raw =
            item?._id || item?.id || item?.dataRealizacao || item?.createdAt || index;
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
                {formatarDataPtBr(item?.dataRealizacao || item?.createdAt)}
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
          marginBottom,
        }}
        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
      >
        <View
          style={{
            width: indicadorWidth,
            height: "100%",
            backgroundColor: coresBase.verdeMedio,
            borderRadius: 25,
            marginLeft: indicadorLeft,
          }}
        />
      </View>
    </>
  );
}
