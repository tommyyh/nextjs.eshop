'use client';
import { signIn } from 'next-auth/react';
import React from 'react';

const Login = () => {
  return (
    <li style={{ cursor: 'pointer' }} onClick={() => signIn()}>
      Login
    </li>
  );
};

export default Login;
