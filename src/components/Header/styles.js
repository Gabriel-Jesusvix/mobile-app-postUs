import styled from 'styled-components/native';

export const ContainerHeader = styled.SafeAreaView`
  width: 100%;
  background: ${props => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #c7c7c7;
`;
export const TitleHeader = styled.Text`
  font-size: 27px;
  font-weight: bold;
  padding-bottom: 15px;
  color: ${props => props.theme.colors.white};
`;
