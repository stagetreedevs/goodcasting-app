import React, {createContext, useState, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import JobModal from '../components/JobModal';
import ConfirmModal from '../components/ConfirmModal';
import ProfilePhotoModal from '../components/ProfilePhotoModal';
import NotificationModal from '../components/NotificationModal';
import SnackbarModal from '../components/Snackbar';
import SelectorModal from '../components/SelectorModal';

export const ModalContext = createContext({
  openModal: null,
  display: ''
});

const ModalProvider = ({children}) => {
  const [modalType, setModalType] = useState(null);
  const [props, setProps] = useState({});
  const [display, setDisplay] = useState('flex');

  const openModal = (type, componentProps) => {
    setModalType(type);
    setProps(componentProps);
  };
  const closeModal = () => {
    setModalType(null);
    setProps({});
  };

  return (
    <ModalContext.Provider value={{openModal, display, setDisplay}}>
      {children}
      {modalType === 'notification' && (
        <NotificationModal handleClose={closeModal} {...props} />
      )}
      {modalType === 'selector' && (
        <SelectorModal handleClose={closeModal} {...props} />
      )}
      {modalType === 'snackbar' && (
        <SnackbarModal handleClose={closeModal} {...props} />
      )}
      {modalType === 'job' && <JobModal display={display} setDisplay={setDisplay} handleClose={closeModal} {...props} />}
      {modalType === 'confirm' && (
        <ConfirmModal handleClose={closeModal} {...props} />
      )}
      {modalType === 'profilePhoto' && (
        <ProfilePhotoModal handleClose={closeModal} {...props} />
      )}
    </ModalContext.Provider>
  );
};

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used inside modal provider');
  }

  return context;
}

export {ModalProvider, useModal};
