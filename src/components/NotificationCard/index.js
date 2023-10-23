import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Container,
  VerticalBar,
  InformationContainer,
  Title,
  Content,
  Time,
  IconCloseContainer,
} from "./styles";
import { useTranslation } from "react-i18next";
import i18n from "../../locales";
import { checkNotificationTranslation } from "../../helpers";
import { useAuth } from "../../contexts/auth";
import LinearGradient from "react-native-linear-gradient";
import ptBR from "date-fns/locale/pt-BR";
import en from "date-fns/locale/en-US";
import es from "date-fns/locale/es";

const NotificationCard = ({
  notification,
  handleRemoveNotification,
  ...props
}) => {
  useEffect(() => {
    if (i18n.language == "pt") {
      setLang(ptBR);
    } else if (i18n.language == "en") {
      setLang(en);
    } else {
      setLang(es);
    }
  }, []);

  const { user } = useAuth();
  const [lang, setLang] = useState();
  const { t } = useTranslation("notifications");
  const { type, title, message, created_at, artist, client } = notification;

  const _renderText = (message) => {
    if (checkNotificationTranslation(message)) {
      return t(message);
    } else {
      return message;
    }
  };
  const dateDiferencaEmDias = (a, b) => {
    // Descartando timezone e horário de verão
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  };
  return (
    <Container {...props}>
      {user.id === artist || user.id === client ? (
        <IconCloseContainer
          hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
          onPress={() => handleRemoveNotification(notification)}
        >
          <MaterialCommunityIcons color={`#000`} name="close" size={20} />
        </IconCloseContainer>
      ) : null}
      <LinearGradient
        colors={["#353C46", "#151515"]}
        useAngle={true}
        angle={120}
        angleCenter={{ x: 1.0, y: 0.5 }}
        style={{
          borderRadius: 12,
          width: "100%",
          padding: 16,
          paddingBottom: 24,
          flexDirection: "row",
        }}
      >
        <VerticalBar type={type} />
        <InformationContainer>
          <Title>{_renderText(title)}</Title>
          <Content>{_renderText(message)}</Content>
        </InformationContainer>
        <Time>
          {formatDistance(new Date(created_at), new Date(), { locale: lang })}
        </Time>
      </LinearGradient>
    </Container>
  );
};

export default NotificationCard;
