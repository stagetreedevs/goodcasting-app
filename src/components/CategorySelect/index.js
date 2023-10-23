import React from "react";

import { Container, CategoryImage } from "./styles";

import Paragraph from "../Paragraph";
import { Image, Text } from "native-base";
import { useTranslation } from "react-i18next";

const CategorySelect = ({ category: { image, name, selected }, ...props }) => {
  const { t } = useTranslation("categorySelector");
  return (
    <Container {...props}>
      <CategoryImage selected={selected} source={{ uri: image }}/>
      <Text color={"#fff"} fontFamily={"Karla-Bold"} fontSize={20} type="subtitle">
        {t(name)}
      </Text>
    </Container>
  );
};

export default CategorySelect;
