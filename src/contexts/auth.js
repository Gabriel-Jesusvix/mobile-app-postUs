import {useState, createContext, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  async function handlerCreateAccount(name, email, password) {
    setLoadingAuth(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;

        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            name,
            createdAt: new Date(),
          })
          .then(() => {
            const dataUser = {
              uid,
              name,
              email: value.user.email,
            };
            setUser(dataUser);
            setLoadingAuth(false);
            storageUser(dataUser);
          });
      })
      .catch(error => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  async function signIn(email, password) {
    setLoadingAuth(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;

        const user = await firestore().collection('users').doc(uid).get();

        const dataUser = {
          uid,
          name: user.data().name,
          email: value.user.email,
        };

        setUser(dataUser);
        setLoadingAuth(false);
        storageUser(dataUser);
      })
      .catch(error => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('@postapp', JSON.stringify(data));
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@postapp');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }

    loadStorage();
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        signed: !user,
        loading,
        signIn,
        signOut,
        handlerCreateAccount,
        loadingAuth,
        user,
        setUser,
        storageUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
