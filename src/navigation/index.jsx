import React, { createContext, useContext, useState } from 'react';
import firebaseSetup from '../firebase/config.js';
import { AuthProvider } from './AuthProvider';
import { AuthContext } from '../navigation/AuthProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
