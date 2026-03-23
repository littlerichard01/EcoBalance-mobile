import { Button } from "react-native";

export function BotaoCriarRotina() {
    return (
        <Button
            title="Criar Rotina"
            onPress={() => console.log("Botão Criar Rotina pressionado")}
        />
    );
}