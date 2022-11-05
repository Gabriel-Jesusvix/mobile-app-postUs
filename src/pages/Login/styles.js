import styled from 'styled-components/native';

export const ContainerLogin = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.background};
  justify-content: center;
  align-items: center;
`;
export const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 55px;
  font-weight: bold;
  font-style: italic;
`;
export const Input = styled.TextInput`
  width: 80%;
  background: ${props => props.theme.colors.white};
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
`;
export const Button = styled.TouchableOpacity`
  width: 80%;
  background: ${props => props.theme.colors['blue-600']};
  border-radius: 8px;
  margin-top: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
`;

export const LinkSignUpButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;
export const LinkSignUpButtonText = styled.Text`
  color: ${props => props.theme.colors['gray-200']};
  font-size: 15px;
  text-decoration: underline;
`;
