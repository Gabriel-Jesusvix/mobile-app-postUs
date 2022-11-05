import {useCallback, useLayoutEffect, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';

import {PostList} from '../../components/PostList';
import {useAuth} from '../../contexts/auth';
import {ContainerPostsUser, ListPosts} from './styles';

export function PostsUser() {
  const {user} = useAuth();
  const route = useRoute();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {title, userId} = route.params;
  const {setOptions} = useNavigation();

  console.log('posts', posts);
  useLayoutEffect(() => {
    setOptions({
      title: title === ' ' ? '' : title,
    });
  }, [setOptions, title]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      firestore()
        .collection('posts')
        .where('userId', '==', userId)
        .orderBy('created', 'desc')
        .get()
        .then(snapshot => {
          const postList = [];
          snapshot.docs.map(post => {
            postList.push({
              ...post.data(),
              id: post.id,
            });

            if (isActive) {
              setPosts(postList);
              setLoading(false);
            }
          });
        });

      return () => {
        isActive = false;
      };
    }, []),
  );
  return (
    <ContainerPostsUser>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color="#E52246" />
        </View>
      ) : (
        <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({item}) => {
            return <PostList data={item} userId={user?.uid} />;
          }}
        />
      )}
    </ContainerPostsUser>
  );
}
