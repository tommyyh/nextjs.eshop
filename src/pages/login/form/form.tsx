'use client';

import style from './form.module.scss';
import React, { useRef } from 'react';
import SubmitButton from '@/components/Button/Button';
import { useRouter } from 'next/navigation';

const Form = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const router = useRouter();

  // Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={(e) => (emailRef.current = e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => (passwordRef.current = e.target.value)}
        />
      </div>

      <SubmitButton>Login</SubmitButton>
    </form>
  );
};

export default Form;
