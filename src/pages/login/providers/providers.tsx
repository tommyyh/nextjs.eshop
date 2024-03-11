'use client';

import { SignInResponse, signIn } from 'next-auth/react';
import React from 'react';
import style from './provider.module.scss';

const Provider = () => {
  const handleLogin = async (provider: 'google') => {
    const res = (await signIn(provider, {
      redirect: false,
    })) as SignInResponse;

    console.log(res);
  };

  return (
    <div className={style.providers}>
      <button onClick={() => handleLogin('google')}>Sign in with Google</button>
    </div>
  );
};

export default Provider;
