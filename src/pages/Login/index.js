import {useState} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {useAuth} from '../../contexts/auth';
import {
  Button,
  ButtonText,
  ContainerLogin,
  Input,
  LinkSignUpButton,
  LinkSignUpButtonText,
  Title,
} from './styles';

export function Login() {
  const {signIn, handlerCreateAccount, loadingAuth} = useAuth();
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  }
  async function handlerSignIn() {
    if (email === '' || password === '') {
      console.log('Prencha todos os campos');
      return;
    }

    await signIn(email, password);
  }

  async function handlerSignUp() {
    if (name === '' || email === '' || password === '') {
      console.log('Prencha todos os campos');
      return;
    }
    await handlerCreateAccount(name, email, password);
  }
  if (login) {
    return (
      <ContainerLogin>
        <Title>
          Post<Text style={{color: '#E52246'}}>US</Text>
        </Title>

        <Input
          placeholder="seuemail@gmail.com"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <Input
          placeholder="********"
          value={password}
          onChangeText={password => setPassword(password)}
        />

        <Button onPress={handlerSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFFFFF" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>
        <LinkSignUpButton onPress={toggleLogin}>
          <LinkSignUpButtonText>Criar uma conta</LinkSignUpButtonText>
        </LinkSignUpButton>
      </ContainerLogin>
    );
  }

  return (
    <ContainerLogin>
      <Title>
        Post
        <Text style={{color: '#E52246'}}>Us</Text>
      </Title>

      <Input
        placeholder="Nome"
        value={name}
        onChangeText={name => setName(name)}
      />
      <Input
        placeholder="seuemail@gmail.com"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <Input
        placeholder="********"
        value={password}
        onChangeText={password => setPassword(password)}
      />

      <Button onPress={handlerSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={20} color="#FFFFFF" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>
      <LinkSignUpButton onPress={toggleLogin}>
        <LinkSignUpButtonText>Já possuo uma conta? Entrar</LinkSignUpButtonText>
      </LinkSignUpButton>
    </ContainerLogin>
  );
}
