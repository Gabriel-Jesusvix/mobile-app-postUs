import styled from 'styled-components/native';

export const ContainerSearch = styled.SafeAreaView`
  padding-top: 15px;
  flex: 1;
  background: ${props => props.theme.colors.background};
`;

export const WrraperInput = styled.View`
  flex-direction: row;
  align-items: center;
  background: ${props => props.theme.colors.white};
  margin: 10px;
  border-radius: 4px;
  padding: 5px 10px;
`;
export const Input = styled.TextInput`
  width: 90%;
  background: transparent;
  height: 40px;
  padding-left: 8px;
  font-size: 14px;
  color: #121212;
`;

export const ListSearch = styled.FlatList``;
