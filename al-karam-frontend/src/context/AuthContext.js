// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
  const getIdToken = async () => {
    if (auth.currentUser) return await auth.currentUser.getIdToken(/* forceRefresh */ true);
    return null;
  };

  const value = { user, loading, signup, login, logout, signInWithGoogle, getIdToken };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
