import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Wrapper, Container, ActionContainer } from "./styles";

import Paragraph from "../Paragraph";
import Button from "../Button";
import { Text } from "native-base";

const ConfirmModal = ({
  handleClose,
  title,
  subTitle,
  confirmOption,
  rejectOption,
  onConfirm,
  noHeight,
  onReject = handleClose,
  onConfirmDisabled,
}) => {
  const [screen, setScreen] = useState(Dimensions.get("screen"));

  useEffect(() => {
    Dimensions.addEventListener("change", () => {
      setScreen(Dimensions.get("screen"));
    });

    return () => {
      Dimensions.removeEventListener("change");
    };
  }, []);

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleReject = () => {
    if (onReject) onReject();
    handleClose();
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <Wrapper width={screen.width} height={screen.height}>
        <Container height={screen.height} noHeight={noHeight}>
          <Paragraph style={styles.title} type="subtitle">
            {title}
          </Paragraph>
          {subTitle && (
            <Paragraph style={styles.subTitle}>{subTitle}</Paragraph>
          )}
          <ActionContainer>
            <Button
              disabled={onConfirmDisabled}
              style={styles.button}
              type="confirm"
              onPress={handleConfirm}
            >
              <Text color={"#232131"} fontSize={12}>{confirmOption}</Text>
            </Button>
            <Button
              type="confirm"
              onPress={handleReject}
              style={[styles.button, styles.noSelectButton]}
            >
              <Text color={"#232131"} fontSize={12}>{rejectOption}</Text>
            </Button>
          </ActionContainer>
        </Container>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    marginTop: 22,
    marginBottom: 22,
    fontWeight: "400",
    fontStyle: "italic",
    color: "#fff",
  },
  button: {
    paddingHorizontal: 12,
  },
  noSelectButton: {
    backgroundColor: "#aaa",
  },
});

export default ConfirmModal;
