// import React, { useEffect, useState, createContext, useContext } from "react";
// import { app, auth } from "./firebase-config";
// import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState({});
//   //   const [pending, setPending] = useState(true);

//   //   const signIn = (email, password) => {
//   //     return signInWithEmailAndPassword(auth, email, password);
//   //   };

//   const signIn = (email, password) => {
//     console.log("THIS WAS REACHED!");
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   //   useEffect(() => {
//   //     app.auth().onAuthStateChanged(setCurrentUser);
//   //     setPending(false);
//   //   }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log(currentUser);
//       setCurrentUser(currentUser);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   //   if (pending) {
//   //     return <>Loading...</>;
//   //   }

//   return (
//     <AuthContext.Provider value={(currentUser, signIn)}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
