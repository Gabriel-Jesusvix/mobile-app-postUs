import {useState, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {useAuth} from '../../contexts/auth';
import {ContainerNewPost, Input, Button, ButtonText} from './styles';

export function NewPost() {
  const [post, setPost] = useState('');
  const {user} = useAuth();
  const {setOptions, goBack} = useNavigation();

  async function handlerPost() {
    if (post === '') {
      alert('Conteúdo inválido');
      return;
    }
    let avatarUrl = null;
    try {
      let response = await storage()
        .ref('users')
        .child(user?.uid)
        .getDownloadURL();

      avatarUrl = response;
    } catch (error) {
      avatarUrl = null;
    }

    await firestore()
      .collection('posts')
      .add({
        created: new Date(),
        content: post,
        autor: user?.name,
        userId: user?.uid,
        likes: 0,
        avatarUrl,
      })
      .then(() => {
        setPost('');
      })
      .catch(error => {
        console.log('Erro ao criar', error);
        alert('Erro ao criar post. Tente novamente mais tarde');
      });
    goBack();
  }

  useLayoutEffect(() => {
    const options = setOptions({
      headerRight: () => (
        <Button onPress={handlerPost}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      ),
    });
  }, [post, setOptions]);

  return (
    <ContainerNewPost>
      <Input
        placeholder="O que está acontencendo..."
        autoCorrect={false}
        multiline={true}
        placeholderTextColor="#C3c3c3"
        value={post}
        maxLength={350}
        onChangeText={post => setPost(post)}
      />
    </ContainerNewPost>
  );
}
