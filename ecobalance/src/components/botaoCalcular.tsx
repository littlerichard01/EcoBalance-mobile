import { Button } from "react-native";

export function BotaoCalcular() {
    return (
        <Button
            title="Calcular"
            onPress={() => console.log("Botão Calcular pressionado")}
        />
    );
}