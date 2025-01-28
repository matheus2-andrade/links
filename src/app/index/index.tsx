import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";

import { styles } from "./styles";
import { colors } from "@/styles/colors";

export default function Index() {
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

      <Categories></Categories>

      <FlatList
        data={["1", "2", "3", "4", "5"]}
        keyExtractor={(item) => item}
        renderItem={() => (
          <Link
            name="Rocketseat"
            url={"rocketseat.com.br"}
            onDetails={function () {
              console.log("birimbau");
            }}
          ></Link>
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      ></FlatList>

      <Modal transparent visible={false}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>
              <TouchableOpacity>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                ></MaterialIcons>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>Rocketseat</Text>

            <Text style={styles.modalUrl}>rocketseat.com.br</Text>

            <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant="secondary"></Option>
              <Option name="Abrir" icon="language"></Option>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
