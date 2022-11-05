import {useCallback, useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {PencilSimple} from 'phosphor-react-native';
import firestore from '@react-native-firebase/firestore';

import {useAuth} from '../../contexts/auth';

import {ContainerHome, ButtonPost, ListPosts} from './styles';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Header} from '../../components/Header';
import {View} from 'react-native';
import {PostList} from '../../components/PostList';

export function Home() {
  const {user} = useAuth();
  const [posts, setPosts] = useState([]);
  const {navigate} = useNavigation();
  const [loading, setLoading] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  function handlerRefreshPosts() {
    setLoadingRefresh(true);
    firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .get()
      .then(snapshot => {
        setPosts([]);
        const postList = [];

        snapshot.docs.map(item => {
          postList.push({
            ...item.data(),
            id: item.id,
          });
        });

        setEmptyList(false);
        setPosts(postList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });
    setLoadingRefresh(false);
  }

  async function getListPosts() {
    if (emptyList) {
      setLoading(falase);
      return;
    }
    if (loading) return;

    firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .startAfter(lastItem)
      .get()
      .then(snapshot => {
        const postList = [];

        snapshot.docs.map(list => {
          postList.push({
            ...list.data(),
            id: list.id,
          });
        });

        setEmptyList(!!snapshot.empty);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setPosts(oldState => [...oldState, ...postList]);

        setLoading(false);
      });
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      function fetchPosts() {
        firestore()
          .collection('posts')
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then(snapshot => {
            if (isActive) {
              setPosts([]);
              const postList = [];

              snapshot.docs.map(item => {
                postList.push({
                  ...item.data(),
                  id: item.id,
                });
              });

              setEmptyList(!!snapshot.empty);
              setPosts(postList);
              setLastItem(snapshot.docs[snapshot.docs.length - 1]);
              setLoading(false);
            }
          })
          .catch(() => {});
      }
      fetchPosts();

      return () => {
        isActive = false;
      };
    }, []),
  );
  return (
    <ContainerHome>
      <Header />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color="#E52246" />
        </View>
      ) : (
        <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({item}) => <PostList data={item} userId={user?.uid} />}
          refreshing={loadingRefresh}
          onRefresh={handlerRefreshPosts}
          onEndReached={() => getListPosts()}
          onEndReachedThreshold={0.1}
        />
      )}

      <ButtonPost activeOpacity={0.8} onPress={() => navigate('NewPost')}>
        <PencilSimple size={25} color="#FFFF" />
      </ButtonPost>
    </ContainerHome>
  );
}
