import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {formatDistance} from 'date-fns';
import {Heart} from 'phosphor-react-native';
import {ptBR} from 'date-fns/locale';
import firestore from '@react-native-firebase/firestore';

import {
  ContainerPostList,
  Header,
  Avatar,
  Name,
  ContentView,
  Content,
  Footer,
  LikeButton,
  Like,
  TimePost,
} from './styles';

export function PostList({data, userId}) {
  const [likesPosts, setLikesPosts] = useState(data?.likes);
  const {autor, avatarUrl, content, id} = data;
  const {navigate} = useNavigation();

  function formatDatePost() {
    const datePost = new Date(data.created.seconds * 1000);
    return formatDistance(new Date(), datePost, {
      locale: ptBR,
    });
  }

  async function handlerLikePost(id, likes) {
    const docId = `${userId}_${id}`;

    const doc = await firestore().collection('likes').doc(docId).get();

    if (doc.exists) {
      await firestore()
        .collection('posts')
        .doc(id)
        .update({
          likes: likes - 1,
        });
      await firestore()
        .collection('likes')
        .doc(docId)
        .delete()
        .then(() => {
          setLikesPosts(likes - 1);
        });
      return;
    }

    await firestore().collection('likes').doc(docId).set({
      postId: id,
      userId: userId,
    });

    await firestore()
      .collection('posts')
      .doc(id)
      .update({
        likes: likes + 1,
      })
      .then(() => {
        setLikesPosts(likes + 1);
      });
  }
  return (
    <ContainerPostList>
      <Header
        onPress={() =>
          navigate('PostsUser', {title: data?.autor, userId: data?.userId})
        }>
        {avatarUrl ? (
          <Avatar source={{uri: avatarUrl}} />
        ) : (
          <Avatar source={require('../../assets/avatar.png')} />
        )}
        <Name numberOfLines={1}>{autor}</Name>
      </Header>
      <ContentView>
        <Content>{content}</Content>
      </ContentView>
      <Footer>
        <LikeButton onPress={() => handlerLikePost(id, likesPosts)}>
          <Like>{likesPosts === 0 ? '' : likesPosts}</Like>
          {likesPosts === 0 ? (
            <Heart size={20} color="#E52246" />
          ) : (
            <Heart size={20} color="#E52246" weight="fill" />
          )}
        </LikeButton>
        <TimePost>{formatDatePost()}</TimePost>
      </Footer>
    </ContainerPostList>
  );
}
