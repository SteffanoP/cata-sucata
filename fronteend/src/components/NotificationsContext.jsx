import React, { createContext, useContext, useState } from 'react';

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notificacoesLidas, setNotificacoesLidas] = useState(false);

  return (
    <NotificationsContext.Provider value={{ notificacoesLidas, setNotificacoesLidas }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
