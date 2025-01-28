import { FlatList } from "react-native";

import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

type Props = {
  currentCategory: string;
  onChange: (category: string) => void;
};

export function Categories({ currentCategory, onChange }: Props) {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          isSelected={item.name == currentCategory}
          icon={item.icon}
          onPress={() => onChange(item.name)}
        ></Category>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    ></FlatList>
  );
}
