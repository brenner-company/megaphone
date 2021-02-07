import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from '@/lib/firebase';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  const signin = (email, password) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setCurrentUser(user);
        return user;
      });

  const signup = (email, password, displayName) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName });
        setCurrentUser(user);
        return user;
      });

  const signout = () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser(false);
      });

  const sendPasswordResetEmail = (email) =>
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => true);

  const confirmPasswordReset = (code, password) =>
    firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => true);

  const doesUserExist = (email) =>
    firebase
      .auth()
      .fetchSignInMethodsForEmail(email)
      .then((methods) => methods.length > 0);

  // const updateUserProfile = ({ displayName, photoURL }) =>
  //   user.updateProfile({ displayName, photoURL }).then(() => true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user: currentUser,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    doesUserExist,
  };
}
