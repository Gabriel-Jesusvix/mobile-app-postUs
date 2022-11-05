import styled from 'styled-components/native';

export const ContainerNewPost = styled.View`
  flex: 1;
  background: #404349;
`;
export const Input = styled.TextInput`
  background: transparent;
  margin: 10px;
  color: #ffffff;
  font-size: 18px;
`;

export const Button = styled.TouchableOpacity`
  background: ${props => props.theme.colors['blue-600']};
  margin-right: 7px;
  padding: 5px 12px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.white};
`;
