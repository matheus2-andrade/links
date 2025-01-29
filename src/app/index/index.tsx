import { useState, useCallback } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  Alert,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";

import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { categories } from "@/utils/categories";
import { LinkStorage, linkStorage } from "@/storage/link-storage";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [links, setLinks] = useState<LinkStorage[]>([]);
  const [selectedlink, setSelectedlink] = useState<LinkStorage>(
    {} as LinkStorage
  );
  const [category, setCategory] = useState(categories[0].name);

  async function getLinks() {
    try {
      const response = await linkStorage.get();
      const filtered = response.filter((link) => link.category == category);
      setLinks(filtered);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar os links");
      console.log(error);
    }
  }

  function openModal(selectedLink: LinkStorage) {
    setShowModal(true);
    setSelectedlink(selectedLink);
  }

  async function openLink() {
    try {
      await Linking.openURL("https://www.google.com/");
      setShowModal(false);
    } catch (error) {
      Alert.alert("Link", "Não foi possível abrir o link");
      console.log(error);
    }
  }

  async function removeItem() {
    try {
      Alert.alert("Excluir", "Deseja realmente excluir?", [
        { style: "cancel", text: "Não" },
        {
          text: "Sim",
          onPress: async () => {
            await linkStorage.remove(selectedlink);
            await getLinks();
            setShowModal(false);
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o link");
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [category])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/logo.png")}
          style={styles.logo}
        ></Image>
        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons
            name="add"
            size={32}
            color={colors.green[300]}
          ></MaterialIcons>
        </TouchableOpacity>
      </View>

      <Categories
        currentCategory={category}
        onChange={setCategory}
      ></Categories>

      <FlatList
        data={links}
        keyExtractor={(item) => item.id + item.name}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={function () {
              openModal(item);
            }}
          ></Link>
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      ></FlatList>

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                ></MaterialIcons>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>{selectedlink.name}</Text>

            <Text style={styles.modalUrl}>{selectedlink.url}</Text>

            <View style={styles.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={removeItem}
              ></Option>
              <Option name="Abrir" icon="language" onPress={openLink}></Option>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
