import { BotaoRetornar } from "@/src/components/botaoRetornar";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import { coresBase, stylesGeral } from "@/src/styles/stylesGeral";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const MEDIA_GLOBAL = {
    total: 243.19,
    gas: 18.1678775,
    energia: 5.8597,
    alimentos: 139.159,
    veiculos: 80,
    viagens: 0,
};

export default function ResultadoCalculo() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "ResultadoCalculo">>();
    const { teste, rotinaNome } = route.params;

    const emissaoAlimentos = Number(teste?.emissaoAlimentos) || 0;
    const emissaoGas = Number(teste?.emissaoGas) || 0;
    const emissaoVeiculosTotal = Number(teste?.emissaoVeiculos) || 0;
    const emissaoEnergia = Number(teste?.energiaEletrica?.emissao) || Math.max((Number(teste?.emissaoTotal) || 0) - emissaoAlimentos - emissaoGas - emissaoVeiculosTotal, 0);
    const emissaoViagens = Array.isArray(teste?.viagem?.veiculos)
        ? teste.viagem.veiculos.reduce((acc, v) => acc + (Number(v?.emissao) || 0), 0)
        : 0;
    const emissaoVeiculosRotina = Math.max(emissaoVeiculosTotal - emissaoViagens, 0);

    const dataRealizacao = (() => {
        const raw = teste?.dataRealizacao || teste?.createdAt;
        const date = new Date(raw as any);
        if (Number.isNaN(date.getTime())) return "";
        return date.toLocaleDateString("pt-BR");
    })();

    const barrasUsuario = [
        { key: "Alim", label: "Alim", value: emissaoAlimentos, color: coresBase.verdeMedio },
        { key: "Gás", label: "Gás", value: emissaoGas, color: "#4C9F70" },
        { key: "Veíc", label: "Veíc", value: emissaoVeiculosRotina, color: "#2C6E49" },
        { key: "Viag", label: "Viag", value: emissaoViagens, color: "#1B4332" },
        { key: "Ener", label: "Ener", value: emissaoEnergia, color: "#8BC34A" },
    ];
    const barrasGlobal = [
        { key: "Alim", label: "Alim", value: MEDIA_GLOBAL.alimentos, color: coresBase.verdeMedio },
        { key: "Gás", label: "Gás", value: MEDIA_GLOBAL.gas, color: "#4C9F70" },
        { key: "Veíc", label: "Veíc", value: MEDIA_GLOBAL.veiculos, color: "#2C6E49" },
        { key: "Ener", label: "Ener", value: MEDIA_GLOBAL.energia, color: "#8BC34A" },
    ];
    const maxUsuario = Math.max(...barrasUsuario.map((b) => b.value), 1);
    const maxGlobal = Math.max(...barrasGlobal.map((b) => b.value), 1);

    return (
        <ScrollView style={stylesGeral.telaInteira}>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <BotaoRetornar onPress={() => navigation.goBack()} />
                <Text style={stylesGeral.tituloPagina}>Resultado:</Text>
            </View>

            <Text style={styles.resultadoTotal}>
                {Number(teste?.emissaoTotal || 0).toFixed(2)} kgCO₂
            </Text>
            {rotinaNome ? (
                <Text style={styles.resultadoMeta}>Rotina: {rotinaNome}</Text>
            ) : null}
            {dataRealizacao ? (
                <Text style={styles.resultadoMeta}>Data: {dataRealizacao}</Text>
            ) : null}

            <Text style={styles.secaoTitulo}>Seu teste</Text>
            <View style={styles.graficoContainer}>
                {barrasUsuario.map((b) => {
                    const altura = Math.max(10, (b.value / maxUsuario) * 220);
                    return (
                        <View key={b.key} style={styles.barraColuna}>
                            <Text style={styles.barraValor}>{b.value.toFixed(1)}</Text>
                            <View style={[styles.barra, { height: altura, backgroundColor: b.color }]} />
                            <Text style={styles.barraLabel}>{b.label}</Text>
                        </View>
                    );
                })}
            </View>

            <Text style={styles.secaoTitulo}>Média global</Text>
            <View style={styles.graficoContainer}>
                {barrasGlobal.map((b) => {
                    const altura = Math.max(10, (b.value / maxGlobal) * 220);
                    return (
                        <View key={b.key} style={styles.barraColuna}>
                            <Text style={styles.barraValor}>{b.value.toFixed(1)}</Text>
                            <View style={[styles.barra, { height: altura, backgroundColor: b.color }]} />
                            <Text style={styles.barraLabel}>{b.label}</Text>
                        </View>
                    );
                })}
            </View>

            <View style={styles.totalComparacao}>
                <Text style={styles.totalComparacaoLabel}>
                    Total global: {MEDIA_GLOBAL.total.toFixed(2)} kgCO₂
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    resultadoTotal: {
        fontSize: 34,
        fontFamily: "Jost-Bold",
        fontWeight: 900,
        color: coresBase.verdeMedio,
        marginTop: 10,
        marginBottom: 6,
    },
    resultadoMeta: {
        fontSize: 14,
        color: coresBase.verdeEscuro,
        marginBottom: 4,
    },
    secaoTitulo: {
        fontSize: 22,
        fontFamily: "Jost-Bold",
        fontWeight: 900,
        color: coresBase.verdeMedio,
        marginTop: 26,
        marginBottom: 10,
    },
    graficoContainer: {
        width: "100%",
        borderRadius: 16,
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderWidth: 1,
        borderColor: coresBase.verdeBebe,
    },
    barraColuna: {
        width: 58,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    barra: {
        width: 26,
        borderRadius: 10,
    },
    barraValor: {
        fontSize: 12,
        color: "#333",
        marginBottom: 6,
    },
    barraLabel: {
        marginTop: 8,
        fontSize: 12,
        color: "#333",
        fontWeight: 600,
    },
    totalComparacao: {
        marginTop: 18,
        marginBottom: 24,
        padding: 12,
        borderRadius: 14,
        backgroundColor: coresBase.verdeBebe,
    },
    totalComparacaoLabel: {
        fontSize: 16,
        color: coresBase.verdeEscuro,
        fontWeight: 700,
    },
});
