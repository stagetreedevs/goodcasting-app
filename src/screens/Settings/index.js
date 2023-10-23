import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  KeyboardAvoidingView,
  Switch,
  Platform,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Snackbar from "../../components/Snackbar";
import OneSignal from "react-native-onesignal";
import { useTranslation } from "react-i18next";
import { Container, DeleteButton, Body } from "./styles";

import HeaderWithMenu from "../../components/HeaderWithMenu";
import Paragraph from "../../components/Paragraph";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { HStack, VStack, Text } from "native-base";
import { useAuth } from "../../contexts/auth";
import { useModal } from "../../contexts/modal";
import { updateArtist, updateClient } from "../../providers/client";
import { createContact } from "../../providers/contact";
import { useIsFocused } from "@react-navigation/native";
const screenHeight = Dimensions.get("screen").height;

const Settings = ({ navigation }) => {
  const { user, updateClientUser, updateArtistUser } = useAuth();
  const { openModal } = useModal();
  const isFocused = useIsFocused();
  const [isEnabled, setIsEnabled] = useState(false);
  const { t } = useTranslation("settings");

  const [changePasswordPayload, setChangePasswordPayload] = useState({
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [clientPayload, setClientPayload] = useState({
    name: user.name,
    trading_name: user.trading_name,
    phone_prefix: user.phone_prefix,
    phone: user.phone,
    email: user.email,
    site: user.site,
    taxpayer: user.taxpayer,
    full_address: user.full_address,
    address_city: user.address_city,
    address_state: user.address_state,
  });
  const [loadingPasswordSubmit, setLoadingPasswordSubmit] = useState(false);
  const [loadingClientSubmit, setLoadingClientSubmit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isFocused) {
      if (Platform.OS === "ios") {
        checkOnesignalIOS();
      } else {
        checkOnesignalAndroid();
      }
    }
  }, [isFocused]);

  const handleChangePasswordPayload = (field, value) =>
    setChangePasswordPayload({ ...changePasswordPayload, [field]: value });

  const handleChangeClientPayload = (field, value) =>
    setClientPayload({ ...clientPayload, [field]: value });

  const handlePasswordSubmit = async () => {
    setLoadingPasswordSubmit(true);

    if (
      changePasswordPayload.newPassword !==
      changePasswordPayload.newPasswordConfirmation
    ) {
      setLoadingPasswordSubmit(false);
      return Snackbar.show({
        text: t("confirmationPasswordError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (changePasswordPayload.newPassword.length < 8) {
      setLoadingPasswordSubmit(false);
      return Snackbar.show({
        text: t("passwordDigitsError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }

    if (user.type === "Cliente") {
      await updateClientUser({
        password: changePasswordPayload.newPassword,
      });
    } else {
      await updateArtistUser({
        password: changePasswordPayload.newPassword,
      });
    }

    setLoadingPasswordSubmit(false);
    navigation.navigate("Tab");
  };

  const handleClientSubmit = () => {
    openModal("confirm", {
      title: t("confirmModalTitle"),
      confirmOption: t("confirmModalAccept"),
      rejectOption: t("confirmModalReject"),
      onConfirm: doSubmitClient,
    });
  };

  const validField = () => {
    if (clientPayload.name.length <= 3) {
      Snackbar.show({
        text: t("nameError"),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    if (clientPayload.trading_name.length <= 3) {
      Snackbar.show({
        text: t("fantasyError"),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    if (clientPayload.email.length <= 3) {
      Snackbar.show({
        text: t("emailError"),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    if (clientPayload.phone_prefix.length <= 2) {
      Snackbar.show({
        text: t("errorPrefix"),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    if (clientPayload.phone.length <= 5) {
      Snackbar.show({
        text: t("errorPhone"),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    if (clientPayload.full_address.length <= 3) {
      Snackbar.show({
        text: t("erroFullAddress"),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    if (clientPayload.address_city.length <= 3) {
      Snackbar.show({
        text: t("address_cityError"),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    if (clientPayload.address_state.length <= 3) {
      Snackbar.show({
        text: t("address_stateError"),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    if (clientPayload.taxpayer.length <= 5) {
      Snackbar.show({
        text: t("errorTaxpayer"),
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }

    return true;
  };

  const doSubmitClient = async () => {
    if (validField()) {
      setLoadingClientSubmit(true);

      await updateClientUser({
        ...clientPayload,
        status: "EM ANALISE",
      });

      setLoadingClientSubmit(false);
      navigation.navigate("Tab");
    }
  };

  async function checkOnesignalAndroid() {
    const status = await OneSignal.getDeviceState();

    if (status) {
      if (status.hasNotificationPermission == true) {
        const { userId } = status;

        if (userId === user.onesignal_id) {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      } else {
        setIsEnabled(false);
      }
    }
  }

  async function statusOneSignalAndroid(value) {
    const status = await OneSignal.getDeviceState();
    if (status.hasNotificationPermission) {
      if (user.type === "Cliente") {
        setIsEnabled(value);
        const response = await updateClientUser({
          onesignal_id: value ? status.userId : "",
        });
        if (response) {
          Snackbar.show({
            text: t("notificationSucess"),
            duration: Snackbar.LENGTH_LONG,
          });
        } else {
          Snackbar.show({
            text: t("notificationError"),
            duration: Snackbar.LENGTH_LONG,
          });
          setIsEnabled(!value);
        }
      } else {
        setIsEnabled(value);
        const response = await updateArtistUser({
          onesignal_id: value ? status.userId : "",
        });
        if (response) {
          Snackbar.show({
            text: t("notificationSucess"),
            duration: Snackbar.LENGTH_LONG,
          });
        } else {
          Snackbar.show({
            text: t("notificationError"),
            duration: Snackbar.LENGTH_LONG,
          });
          setIsEnabled(!value);
        }
      }
    } else {
      return Snackbar.show({
        text: t("activate_notification"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async function checkOnesignalIOS() {
    const status = await OneSignal.getDeviceState();
    if (status.notificationPermissionStatus === 2) {
      const { userId } = status;
      //tem permissao
      if (user.onesignal_id === userId) {
        setIsEnabled(true);
      }
    } else if (status.notificationPermissionStatus === 0) {
      // nao determinado -- precisa pergunta ao usuario se deseja recebe notificacao.
    } else if (status.notificationPermissionStatus === 1) {
      // negado
      setIsEnabled(false);
    } else {
      // nao tem permissao
      setIsEnabled(false);
    }
  }

  async function statusOneSignalIOS(value) {
    const status = await OneSignal.getDeviceState();
    if (status.notificationPermissionStatus === 2) {
      if (user.type === "Cliente") {
        setIsEnabled(value);
        const response = await updateClientUser({
          onesignal_id: value ? status.userId : "",
        });
        if (response) {
          Snackbar.show({
            text: t("notificationSucess"),
            duration: Snackbar.LENGTH_LONG,
          });
        } else {
          Snackbar.show({
            text: t("notificationError"),
            duration: Snackbar.LENGTH_LONG,
          });
          setIsEnabled(!value);
        }
      } else {
        setIsEnabled(value);
        const response = await updateArtistUser({
          onesignal_id: value ? status.userId : "",
        });
        if (response) {
          Snackbar.show({
            text: t("notificationSucess"),
            duration: Snackbar.LENGTH_LONG,
          });
        } else {
          Snackbar.show({
            text: t("notificationError"),
            duration: Snackbar.LENGTH_LONG,
          });
          setIsEnabled(!value);
        }
      }
    } else if (status.notificationPermissionStatus === 0) {
      OneSignal.promptForPushNotificationsWithUserResponse((permission) => {
        if (permission) {
          statusOneSignalIOS(true);
        } else {
          return Snackbar.show({
            text: t("activate_notification"),
            duration: Snackbar.LENGTH_LONG,
          });
        }
      });
    } else {
      // negado
      return Snackbar.show({
        text: t("activate_notification"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  async function handleActiveNotification(value) {
    const status = await OneSignal.getDeviceState();

    if (Platform.OS === "ios") {
      statusOneSignalIOS(value);
    } else {
      statusOneSignalAndroid(value);
    }
  }

  async function handleDeleteAccount() {
    try {
      const response = createContact({
        name: user.name,
        email: user.email,
        title: "Exclusão de conta",
        message:
          "Pedido de exclusão de conta. entre em contato com o usuário que abriu o pedido para iniciar o processo",
      });

      Snackbar.show({
        text: t("contactSuccess"),
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (e) {
      Snackbar.show({
        text: t("contactError"),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  return (
    <Body>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text>fecha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        <HeaderWithMenu
          style={{
            marginBottom: 12,
          }}
        />
        <HStack
          alignItems={"center"}
          justifyContent={"space-between"}
          paddingX={4}
          marginBottom={3}
        >
          <Text
            fontSize={20}
            color="#fff"
            fontFamily={"ClashDisplay-Bold"}
            mr={2}
          >
            {t("title")}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#62D9FF",
              borderStyle: "solid",
              width: "55%",
              opacity: 0.8,
            }}
          ></View>
        </HStack>
        <View
          style={{
            flex: 1,
            paddingTop: "7.5%",
            backgroundColor: "#232131",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          }}
        >
          <Container>
            <Input
              style={styles.input}
              secureTextEntry
              placeholder={t("newPassword")}
              value={changePasswordPayload.newPassword}
              onChangeText={(text) =>
                handleChangePasswordPayload("newPassword", text)
              }
            />
            <Input
              style={styles.input}
              secureTextEntry
              placeholder={t("newPasswordConfirmation")}
              value={changePasswordPayload.newPasswordConfirmation}
              onChangeText={(text) =>
                handleChangePasswordPayload("newPasswordConfirmation", text)
              }
            />
            <Button
              disabled={loadingPasswordSubmit}
              onPress={handlePasswordSubmit}
              style={styles.firstButton}
              type="confirm"
              alignSelf="flex-end"
            >
              <Text fontSize={14} color="#232131" fontFamily={"ClashDisplay-Bold"}>
                {t("confirmPasswordReset")}
              </Text>
            </Button>
            <View style={styles.notification}>
              <Text
                style={{ marginTop: 6 }}
                color={"#fff"}
                fontFamily={"Karla-Regular"}
              >
                {t("receive_notification")}
              </Text>
              <Switch
                trackColor={{ false: "primaryOpacity", true: "primaryColor" }}
                onValueChange={handleActiveNotification}
                thumbColor={isEnabled ? "primaryColor" : "primaryOpacity"}
                value={isEnabled}
              />
            </View>

            <DeleteButton
              onPress={() =>
                openModal("confirm", {
                  title: t("deleteTitle"),
                  subTitle: t("deleteSubtitle"),
                  confirmOption: t("deleteConfirm"),
                  rejectOption: t("deleteCancel"),
                  noHeight: true,
                  onConfirm: handleDeleteAccount,
                })
              }
            >
              <Text
                fontSize={14}
                color="#fff"
                fontFamily={"ClashDisplay-Bold"}
                mr={2}
              >
                {t("deleteButton")}
              </Text>
            </DeleteButton>

            {/* {user.type === "Cliente" && (
              <>
                <Input
                  style={styles.input}
                  placeholder={t("name")}
                  value={clientPayload.name}
                  onChangeText={(text) =>
                    handleChangeClientPayload("name", text)
                  }
                />
                <Input
                  style={styles.input}
                  placeholder={t("fantasyName")}
                  value={clientPayload.trading_name}
                  onChangeText={(text) =>
                    handleChangeClientPayload("trading_name", text)
                  }
                />
                <Input
                  style={styles.input}
                  placeholder="E-mail"
                  value={clientPayload.email}
                  onChangeText={(text) =>
                    handleChangeClientPayload("email", text)
                  }
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingBottom: 8,
                  }}
                >
                  <View style={{ width: "20%" }}>
                    <Input
                      style={styles.input}
                      placeholder={t("prefix")}
                      value={clientPayload.phone_prefix}
                      onChangeText={(text) =>
                        handleChangeClientPayload("phone_prefix", text)
                      }
                      keyboardType="numeric"
                      type={"mask"}
                      mask={"custom"}
                      options={{
                        mask: "+999",
                      }}
                    />
                  </View>
                  <View style={{ width: "70%" }}>
                    <Input
                      style={styles.input}
                      placeholder={t("phone")}
                      value={clientPayload.phone}
                      keyboardType="numeric"
                      type={"mask"}
                      mask={"custom"}
                      options={{
                        mask: "(999) 9999999999",
                      }}
                      onChangeText={(text) =>
                        handleChangeClientPayload("phone", text)
                      }
                    />
                  </View>
                </View>
                <Input
                  style={styles.input}
                  placeholder={t("website")}
                  value={clientPayload.site}
                  onChangeText={(text) =>
                    handleChangeClientPayload("site", text)
                  }
                />
                <Input
                  style={styles.input}
                  placeholder={t("full_address")}
                  value={clientPayload.full_address}
                  onChangeText={(text) =>
                    handleChangeClientPayload("full_address", text)
                  }
                />
                <Input
                  style={styles.input}
                  placeholder={t("address_city")}
                  value={clientPayload.address_city}
                  onChangeText={(text) =>
                    handleChangeClientPayload("address_city", text)
                  }
                />
                <Input
                  style={styles.input}
                  placeholder={t("address_state")}
                  value={clientPayload.address_state}
                  onChangeText={(text) =>
                    handleChangeClientPayload("address_state", text)
                  }
                />
                <Input
                  style={styles.input}
                  placeholder={t("taxpayer")}
                  value={clientPayload.taxpayer}
                  onChangeText={(text) =>
                    handleChangeClientPayload("taxpayer", text)
                  }
                />
                <Button
                  style={styles.secondButton}
                  onPress={handleClientSubmit}
                  disabled={loadingClientSubmit}
                  type="confirm"
                  alignSelf="flex-end"
                >
                  <Text
                    fontSize={12}
                    color="#232131"
                    fontFamily={"ClashDisplay-Bold"}
                  >
                    {t("submit")}
                  </Text>
                </Button>
              </>
            )} */}
          </Container>
        </View>
      </KeyboardAvoidingView>
    </Body>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 19,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    height: 40,
  },
  firstButton: {
    marginBottom: 16,
  },
  secondButton: {
    marginBottom: 64,
  },
  bottomImage: {
    width: "100%",
    height: "100%",
    // transform: [{
    //   rotate: '-43deg'
    // }]
  },
  clientBottomImage: {
    position: "absolute",
    bottom: -400,
    zIndex: -1,
  },
  notification: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "stretch",
    marginBottom: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
phoneContainer: {
    width: '75%',
    height: 50,
},
button: {
    marginTop: 30,
    width: '75%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18d4d4',
},
textInput: {
    paddingVertical: 0,
},
text: {
    color:'white',
    fontWeight:'600'
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#00000050',
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
});

export default Settings;
