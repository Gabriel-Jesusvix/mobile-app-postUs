import styled from 'styled-components/native';

export const ContainerProfile = styled.View`
  flex: 1;
  align-items: center;
  background: ${props => props.theme.colors.background};
`;

export const Name = styled.Text`
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme.colors.white};
`;
export const Email = styled.Text`
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
  font-size: 18px;
  font-style: italic;
  color: ${props => props.theme.colors.white};
`;
export const Button = styled.TouchableOpacity`
  background: ${props => props.bg};

  margin-top: 16px;
  width: 80%;
  height: 50px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
export const ButtonText = styled.Text`
  color: ${props => props.color};
  font-size: 18px;
`;

export const UploadButton = styled.TouchableOpacity`
  margin-top: 20%;
  background: ${props => props.theme.colors.white};
  width: 165px;
  height: 165px;
  border-radius: 90px;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;
export const UploadText = styled.Text`
  font-size: 55px;
  position: absolute;
  color: #e52246;
  opacity: 0.5;
  z-index: 99;
`;
export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  opacity: 0.9;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
  width: 100%;
  height: 60%;
  background: ${props => props.theme.colors.white};
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;
export const ButtonBack = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 25px;
  flex-direction: row;
  align-items: center;
`;
export const Buttontext = styled.Text``;
export const Input = styled.TextInput`
  background: #ddd;
  width: 90%;
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  color: #121212;
  text-align: center;
`;
