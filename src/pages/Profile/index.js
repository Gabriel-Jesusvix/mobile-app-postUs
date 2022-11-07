import {useEffect, useState} from 'react';
import {useAuth} from '../../contexts/auth';
import {Header} from '../../components/Header';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
  ContainerProfile,
  Button,
  ButtonText,
  Email,
  Name,
  UploadButton,
  Avatar,
  ModalContainer,
  ButtonBack,
  Buttontext,
  Input,
} from './styles';
import {ArrowLeft, Camera} from 'phosphor-react-native';
import {Modal, Platform} from 'react-native';

export function Profile() {
  const {signOut, user, setUser, storageUser} = useAuth();
  const [name, setName] = useState(user?.name);
  const [isVisible, setIsVisible] = useState(false);
  const [urlAvatar, setUrlAvatar] = useState(
    'https://avatars.githubusercontent.com/u/62946928?v=4',
  );

  async function handlerSignOut() {
    await signOut();
  }

  async function updadeProfile() {
    if (name === '') {
      return;
    }
    await firestore().collection('users').doc(user?.uid).update({
      name: name,
    });

    const postDocs = await firestore()
      .collection('posts')
      .where('userId', '==', user?.uid)
      .get();

    postDocs.forEach(async post => {
      await firestore().collection('posts').doc(post.id).update({
        autor: name,
      });
    });

    const data = {
      uid: user.uid,
      name: name,
      email: user.email,
    };

    setUser(data);
    storageUser(data);
    setIsVisible(false);
  }

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('cancelou!');
      } else if (response.error) {
        console.log('Ops parece que algo deu errado!', response.error);
      } else {
        uploadFileFirebase(response).then(() => {
          uploadAvatarPosts();
        });
        setUrlAvatar(response.assets[0].uri);
      }
    });
  };

  const uploadFileFirebase = async response => {
    const fileSource = getFileLocalPath(response);

    const storageRef = storage().ref('users').child(user?.uid);

    return await storageRef.putFile(fileSource);
  };
  const getFileLocalPath = response => {
    return response.assets[0].uri;
  };

  const uploadAvatarPosts = async () => {
    const storageRef = storage().ref('users').child(user?.uid);
    const url = await storageRef
      .getDownloadURL()
      .then(async image => {
        const postDoc = await firestore()
          .collection('posts')
          .where('userId', '==', user.uid)
          .get();

        postDoc.forEach(async post => {
          await firestore().collection('posts').doc(post.id).update({
            avatarUrl: image,
          });
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    let isActive = true;
    async function loadAvatar() {
      try {
        if (isActive) {
          const response = await storage()
            .ref('users')
            .child(user?.uid)
            .getDownloadURL();
          setUrlAvatar(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadAvatar();

    return () => (isActive = false);
  }, []);
  return (
    <ContainerProfile>
      <Header />

      {urlAvatar ? (
        <UploadButton onPress={() => uploadFile()}>
          <Camera
            size={40}
            color="#E52246"
            style={{position: 'absolute', zIndex: 99, bottom: 2, right: 2}}
          />

          <Avatar source={{uri: urlAvatar}} />
        </UploadButton>
      ) : (
        <UploadButton onPress={() => uploadFile()}>
          <Camera
            size={40}
            color="#E52246"
            style={{position: 'absolute', zIndex: 99, bottom: 2, right: 2}}
          />
        </UploadButton>
      )}
      <Name>{user?.name}</Name>
      <Email>{user?.email}</Email>

      <Button bg="#428CFD" onPress={() => setIsVisible(true)}>
        <ButtonText color="#FFFFFF">Atualizar Perfil</ButtonText>
      </Button>
      <Button bg="#FFFFFF" onPress={handlerSignOut}>
        <ButtonText color="#3B3B3B">Sair</ButtonText>
      </Button>

      <Modal visible={isVisible} animationType="slide" transparent>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setIsVisible(false)}>
            <ArrowLeft size={20} color="#fb1313" />
            <Buttontext>Voltar</Buttontext>
          </ButtonBack>
          <Input
            placeholder={name}
            value={name}
            onChangeText={name => setName(name)}
          />
          <Button bg="#428CFD" onPress={updadeProfile}>
            <ButtonText color="#3B3B3B">Salvar</ButtonText>
          </Button>
        </ModalContainer>
      </Modal>
    </ContainerProfile>
  );
}
