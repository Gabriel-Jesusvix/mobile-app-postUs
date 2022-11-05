import React from 'react';

import {Text} from 'react-native';

import {ContainerHeader, TitleHeader} from './styles';

export function Header() {
  return (
    <ContainerHeader>
      <TitleHeader>
        POST
        <Text style={{fontStyle: 'italic', color: '#E52246'}}>Us</Text>
      </TitleHeader>
    </ContainerHeader>
  );
}
