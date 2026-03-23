import { Button } from "react-native";

export function BotaoRetornar() {
    return (
        <Button
            title="<- Retornar"
            onPress={() => console.log("Botão Retornar pressionado")}
        />
    );
}