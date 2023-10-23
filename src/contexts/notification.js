import React, {createContext, useState, useContext} from 'react';

export const NotificationContext = createContext({
  newNotification: null,
  notifications: null,
});

const NotificationProvider = ({children}) => {
  const [notifications, setNotifications] = useState([]);

  const newNotification = newNotifications =>
    setNotifications(newNotifications);

  return (
    <NotificationContext.Provider value={{notifications, newNotification}}>
      {children}
    </NotificationContext.Provider>
  );
};

function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used inside notification provider',
    );
  }

  return context;
}

export {NotificationProvider, useNotification};
