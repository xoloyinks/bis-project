 "use client"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

type ContextValue = {
  auth:any,
  db:any,
  selectedRole:any,
  setSelectedRole:any,
}

// userContext.ts
import { createContext, useContext, ReactNode, useState } from 'react';
import React from 'react';
import 'dotenv/config'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_AUTH_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  };

const app= initializeApp(firebaseConfig)
const auth = getAuth(app);
  const db = getFirestore(app);
  
// Create the context
const UserContext = createContext<ContextValue | null>(null);

// Create a custom hook to access the context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Create a provider component
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRole,setSelectedRole] = useState <string>("user");
  useEffect( () => {
  (async () =>{
  try {
    setPersistence(auth,browserSessionPersistence);
    console.log('persistence set')
  } catch (error: any) {
    console.log(error.message)
  }
  
})()
   
  }, []);

  const contextValue : ContextValue = {
    auth,
    db,
    selectedRole,
    setSelectedRole,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { UserProvider, useUser };
