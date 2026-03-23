import { Button } from "react-native";

export function BotaoAvancar() {
    return (
        <Button
            title="Avançar ->"
            onPress={() => console.log("Botão Avançar pressionado")}
        />
    );
}