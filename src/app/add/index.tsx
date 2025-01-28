import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Add() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back}>
          <MaterialIcons
            name="arrow-back"
            size={32}
            color={colors.gray[200]}
          ></MaterialIcons>
        </TouchableOpacity>
        <Text style={styles.title}>Novo</Text>
      </View>
      <Text style={styles.label}>Selecione uma categoria</Text>
      <Categories></Categories>
      <View style={styles.form}>
        <Input
          placeholder="Nome"
          onChangeText={(value) => console.log(value)}
        ></Input>
        <Input placeholder="Url"></Input>
        <Button title="Adicionar"></Button>
      </View>
    </View>
  );
}
