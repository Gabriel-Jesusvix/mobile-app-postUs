import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {View} from 'react-native';

import {ContainerSearchList, Name} from './styles';

export function SearchList({data}) {
  const {navigate} = useNavigation();
  return (
    <ContainerSearchList
      onPress={() =>
        navigate('PostsUser', {title: data?.name, userId: data?.id})
      }>
      <Name>{data?.name}</Name>
    </ContainerSearchList>
  );
}
