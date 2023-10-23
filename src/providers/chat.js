import axios from 'axios';

export const chatUrl = 'URL_DO_SERVICO_DE_CHAT';

const chatProvider = axios.create({
  baseURL: `${chatUrl}/api`,
});

export async function getChats(id) {
  try {
    const response = await chatProvider.get('chats/', {
      params: {
        query: id,
      },
    });

    const ids = [];

    const treatedData = response.data.chatList.filter(chat => {
      if (
        typeof chat.room_id === 'string' &&
        !chat.room_id.includes('@') &&
        !ids.includes(chat.room_id)
      ) {
        ids.push(chat.room_id);
        return chat;
      }
    });

    return {chatList: treatedData};
  } catch (err) {
    throw Error(err);
  }
}

export async function getChat(clientId, artistId, solicitation) {
  try {
    const response = await chatProvider.get('chats/', {
      params: {
        query: clientId,
      },
    });

    const chats = response.data.chatList;

    const chat = chats.filter(responseChat => {
      if (responseChat.room_id === `${clientId}${artistId}${solicitation}`) {
        return responseChat;
      }
    })[0];

    if (chat) {
      return chat;
    }

    throw Error('No chat');
  } catch (err) {
    throw Error(err);
  }
}

export async function getChatHistory(room, timestamp = null) {
  try {
    const response = await chatProvider.get('chat-history/', {
      params: {
        query: room,
        date: timestamp,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function getChatNotification(email) {
  try {
    const response = await chatProvider.get('message_alert/', {
      params: {
        query: email,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}
