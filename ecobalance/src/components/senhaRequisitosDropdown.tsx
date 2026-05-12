import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { coresBase } from "../styles/stylesGeral";
import { getPasswordRequirements } from "../utils/passwordPolicy";

type Props = {
  senha: string;
  visible: boolean;
};

export const SenhaRequisitosDropdown = ({ senha, visible }: Props) => {
  const requisitos = useMemo(() => getPasswordRequirements(senha), [senha]);
  if (!visible) return null;

  return (
    <View
      style={{
        width: "100%",
        marginTop: 6,
        borderWidth: 1,
        borderColor: coresBase.verdeClaro,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: coresBase.verdeBebe,
      }}
    >
      {requisitos.map((r) => (
        <Text
          key={r.id}
          style={{
            color: r.ok ? coresBase.verdeMedio : "#B00020",
            fontSize: 12,
            marginBottom: 6,
          }}
        >
          {r.label}
        </Text>
      ))}
    </View>
  );
};
