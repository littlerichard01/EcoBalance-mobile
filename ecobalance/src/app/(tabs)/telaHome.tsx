import { stylesGeral } from "@/src/styles/stylesGeral";
import React, { useCallback, useState } from "react";
import { View, Text, FlatList, Image, Alert } from "react-native";
import { StylesTelaHome } from "../../styles/telaHomeStyles";
import { fonte } from "@/src/styles/fontes";
import api from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/stackNavigator";

type NavigationProp = StackNavigationProp<RootStackParamList, "MainTabs">;

const avatarSources = [
    require("../../assets/avatars/avatar1.png"),
    require("../../assets/avatars/avatar2.png"),
    require("../../assets/avatars/avatar3.png"),
    require("../../assets/avatars/avatar4.png"),
    require("../../assets/avatars/avatar5.png"),
    require("../../assets/avatars/avatar6.png"),
    require("../../assets/avatars/avatar7.png"),
    require("../../assets/avatars/avatar8.png"),
    require("../../assets/avatars/avatar9.png"),
];

const conquistas = [
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

const niveis = [
    {
        id: 1,
        imagemNivel: require("../../assets/nivel.png"),
        desbloqueado: false,
    }
];

export default function TelaHome() {
    const navigation = useNavigation<NavigationProp>();
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [avatarSelecionado, setAvatarSelecionado] = useState(1);

    const carregarUsuario = useCallback(async () => {
        try {
            const response = await api.get('/users/me');
            setNomeUsuario(response.data?.usuario?.nome ?? '');
            setAvatarSelecionado(Number(response.data?.usuario?.avatarSelecionado) || 1);
        } catch (error: any) {
            const status = error?.response?.status;

            if (status === 401) {
                await AsyncStorage.removeItem('@EcoBalance:token');
                navigation.navigate("TelaCarregamento" as never);
                return;
            }

            Alert.alert("Erro", "Não foi possível carregar seus dados.");
        }
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            void carregarUsuario();
        }, [carregarUsuario])
    );

    return (
        <View style={stylesGeral.telaInteira}>
            <View>
                <Text>Bem vindo ao EcoBalance</Text>
            </View>
            <View style={StylesTelaHome.cabecalho}>
                <Image source={avatarSources[(avatarSelecionado || 1) - 1]} style={StylesTelaHome.avatar} />
                <Text style={fonte.titulo}>{nomeUsuario ? `Olá, ${nomeUsuario}!` : "Olá!"}</Text>
            </View>
            <FlatList

                data={niveis}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View
                        style={{

                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",

                        }}
                    >
                        <Image
                            source={item.imagemNivel}
                            style={{ width: 200, height: 110, marginBottom: 10 }}
                        />

                    </View>
                )}
            />
            <View>
                <Text style={fonte.titulo}>Últimas Conquistas</Text>
                <FlatList
                    data={conquistas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 10,
                                opacity: item.desbloqueado ? 1 : 0.4, // cinza se bloqueado

                            }}
                        >
                            <Image
                                source={item.imagem}
                                style={{ width: 40, height: 40, marginRight: 10 }}
                            />
                            <View>
                                <Text style={{ fontWeight: "bold" }}>{item.titulo}</Text>
                                <Text>{item.descricao}</Text>
                            </View>
                        </View>
                    )}
                />


            </View>
        </View>


    );
}
