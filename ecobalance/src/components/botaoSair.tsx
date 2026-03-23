import { Button } from "react-native";


export function BotaoSair() {
    return (
        <Button
            title="Sair"
            onPress={() => console.log("Botão Sair pressionado")}
        />
    );
}