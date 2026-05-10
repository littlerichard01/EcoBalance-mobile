import { BotaoCriarRotina } from "@/src/components/botaoCriarRotina";
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/navigation/stackNavigator";
import api from "../../services/api";
import { stylesGeral } from "@/src/styles/stylesGeral";
import { stylesTelaRotina } from "@/src/styles/telaRotinaStyle";

export default function TelaRotina() {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [rotinas, setRotinas] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(false);

    // #region Conexão Front-Back (Buscar Rotinas)
    const carregarRotinas = async () => {
        setCarregando(true);
        try {
            const response = await api.get('/rotinas/usuario/lista');
            setRotinas(response.data);
        } catch (error: any) {
            console.error("Erro ao buscar rotinas:", error);
            Alert.alert("Erro", "Não foi possível carregar suas rotinas.");
        } finally {
            setCarregando(false);
        }
    };

    const deletarRotina = async (id: string) => {
        Alert.alert(
            "Excluir Rotina",
            "Tem certeza que deseja excluir esta rotina?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.delete(`/rotinas/${id}`);
                            Alert.alert("Sucesso", "Rotina excluída.");
                            carregarRotinas(); // Recarrega a lista
                        } catch (error: any) {
                            console.error("Erro ao excluir rotina:", error?.response?.data || error?.message || error);
                            Alert.alert("Erro", "Não foi possível excluir a rotina.");
                        }
                    }
                }
            ]
        );
    };

    // Carrega as rotinas toda vez que a tela for focada (útil após criar uma nova)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            carregarRotinas();
        });
        return unsubscribe;
    }, [navigation]);
    // #endregion

    return (   
        <View style={stylesGeral.telaInteira}>
            <View style={stylesTelaRotina.cabecarioTela}>
                <View style={stylesTelaRotina.rotinaIconContainer}>
                <Image 
                    source={require('../../assets/iconRotina.png')}
                    style={stylesTelaRotina.rotinaIcon}
                />
                </View>
                <Text style={stylesGeral.tituloPagina}>Rotinas</Text>
            </View>

            <Text style={stylesGeral.subTituloPagina}>Rotinas Criadas Anteriormente:</Text>
            
            <FlatList 
                data={rotinas} 
                keyExtractor={(item) => item._id.toString()}
                refreshing={carregando}
                onRefresh={carregarRotinas}
                renderItem={({ item }) => (
                    <View style={{ 
                        padding: 15, 
                        borderWidth: 1, 
                        borderColor: '#ccc', 
                        borderRadius: 8, 
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.nome}</Text>
                            <Text style={{ color: '#555' }}>Emissão Mensal (Aprox.): {item.emissoes?.total} kg CO2</Text>
                        </View>
                        <TouchableOpacity onPress={() => deletarRotina(item._id)}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text>Nenhuma rotina encontrada.</Text>}
            />

            <BotaoCriarRotina onPress={() => navigation.navigate("TelaCriarRotina")}/>
        </View>
    );
}
