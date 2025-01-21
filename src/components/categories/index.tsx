import { FlatList } from "react-native";

import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

export function Categories() {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          isSelected={false}
          icon={item.icon}
        ></Category>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    ></FlatList>
  );
}
