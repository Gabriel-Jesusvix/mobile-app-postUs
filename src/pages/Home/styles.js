import styled from 'styled-components/native';

export const ContainerHome = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background};
`;
export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 6%;
  width: 60px;
  height: 60px;
  background: #202225;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const ListPosts = styled.FlatList`
  flex: 1;
  background: #f1f1f1;
`;
