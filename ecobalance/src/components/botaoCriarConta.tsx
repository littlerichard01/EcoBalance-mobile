import { Button } from "react-native";

export function BotaoCriarConta() {
    return (
        <Button
            title="Criar Conta"
            onPress={() => console.log("Botão Criar Conta pressionado")}
        />
    );
}