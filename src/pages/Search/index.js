import {useState, useEffect} from 'react';
import {MagnifyingGlass} from 'phosphor-react-native';
import firestore from '@react-native-firebase/firestore';
import {ContainerSearch, Input, WrraperInput, ListSearch} from './styles';
import {SearchList} from '../../components/SearchList';

export function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (searchInput === '' || searchInput === undefined) {
      setUsers([]);
      return;
    }
    const subscriber = firestore()
      .collection('users')
      .where('name', '>=', searchInput)
      .where('name', '<=', searchInput + '\uf8ff')
      .onSnapshot(snapshot => {
        const listUsers = [];
        snapshot.forEach(doc => {
          listUsers.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        // console.log('List user');
        // console.log(listUsers);
        setUsers(listUsers);
      });

    return () => subscriber();
  }, [searchInput]);
  return (
    <ContainerSearch>
      <WrraperInput>
        <MagnifyingGlass size={20} color="#E52246" />
        <Input
          placeholder="Procurando alguém?"
          value={searchInput}
          onChangeText={search => setSearchInput(search)}
          placeholderTextColor="#353840"
        />
      </WrraperInput>
      <ListSearch
        data={users}
        renderItem={({item}) => <SearchList data={item} />}
      />
    </ContainerSearch>
  );
}
