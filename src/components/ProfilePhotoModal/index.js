import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, Platform, Image } from 'react-native';
import Snackbar from '../Snackbar';
import { CropView } from 'react-native-image-crop-tools';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Wrapper, Container, ActionContainer } from './styles';

import Button from '../Button';
import { uploadArtistPhoto } from '../../providers/client';
import LoadingSpinner from '../LoadingSpinner';
import { useTranslation } from 'react-i18next';

const ProfilePhotoModal = ({
  openModal,
  handleClose,
  user,
  updateArtistUser,
  image: photo,
  confirmOption,
  rejectOption,
  onConfirm,
  onReject = handleClose,
}) => {
  const [screen, setScreen] = useState(Dimensions.get('screen'));
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [pathImage, setPathImage] = useState('');
  const cropViewRef = useRef();
  const { t } = useTranslation("artistProfilePhoto");

  useEffect(() => {
    if (Platform.OS === "android") {
      downLoadImage();
    }

    Dimensions.addEventListener('change', () => {
      setScreen(Dimensions.get('screen'));
    });

    return () => {
      Dimensions.removeEventListener('change');

      //using this to clear images cached on android
      if(Platform.OS === "android") {
        ReactNativeBlobUtil.session('profilecache').dispose()
        .catch(error => console.log(error))
      }
    };
  }, []);

  const downLoadImage = () => {
    setLoadingImage(true);
    ReactNativeBlobUtil
    .config({
      fileCache: true,
      appendExt: 'jpg',
      session: 'profilecache'
    })
    .fetch('GET', photo.image)
    .then(async (res) => {
      let status = res.info().status;

      if (status == 200) {
        let path = res.path();
        setPathImage(path);
        setLoadingImage(false);
      } else {
        // handle other status codes
      }
    })
    .catch((errorMessage, statusCode) => {
      console.log(errorMessage, statusCode);
      setLoadingImage(false);
    })
  }

  const handleConfirm = () => {
    cropViewRef.current.saveImage(true, 100);
  };

  const handleReject = () => {
    if (onReject) onReject();
    handleClose();
  };

  const handleCrop = async res => {
    console.log({...res,
      uri: Platform.OS === "android" ? "file://"+res.uri : res.uri});
    try {
      setLoadingSubmit(true);
      const response = await uploadArtistPhoto({
        ...res,
        uri: Platform.OS === "android" ? "file://"+res.uri : res.uri //if device is android fix path image.
      }, user);
      const { url } = response;
      if (url) {
        await updateArtistUser({ image: url });
        onConfirm();
        handleClose();
      } else {
        throw Error('err');
      }
    } catch (err) {
      setLoadingSubmit(false);
      console.log('err => '+err);
    if(err.message === 'Request failed with status code 413'){
      return Snackbar.show({
        text: t('ErrorSize'),
      });
    }
    return Snackbar.show({
        text: t('ErrorPicture'),
      });
    }
  };

  return (
    <Wrapper width={screen.width} height={screen.height}>
      <Container height={screen.height}>
        {!loadingImage ? photo.image && (
          <CropView
            sourceUrl={Platform.OS === "android" ? 'file://'+pathImage : photo.image}
            style={styles.cropView}
            ref={cropViewRef}
            onImageCrop={res => handleCrop(res)}
            keepAspectRatio
            aspectRatio={{ width: 200, height: 200 }}
          />
        ) : <LoadingSpinner style={styles.loading} size="large" />}
        <ActionContainer>
          <Button disabled={loadingSubmit} style={styles.button} type="confirm" onPress={handleConfirm}>
            {confirmOption}
          </Button>
          <Button
            disabled={loadingSubmit}
            type="confirm"
            onPress={handleReject}
            style={[styles.button, styles.noSelectButton]}>
            {rejectOption}
          </Button>
        </ActionContainer>
      </Container>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 12,
  },
  noSelectButton: {
    backgroundColor: '#aaa',
  },
  cropView: {
    width: 200,
    height: 200,
    resizeMode: 'cover'
  },
  loading: {
    flex: 1,
  }
});

export default ProfilePhotoModal;
