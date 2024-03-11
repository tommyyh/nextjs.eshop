'use client';

import style from './form.module.scss';
import React, { useRef, useState } from 'react';
import SubmitButton from '@/components/Button/Button';
import { useRouter } from 'next/navigation';
import { SignInResponse, signIn } from 'next-auth/react';
import Provider from '../providers/providers';

const Form = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset messages
    setSuccess('');
    setError('');

    // Send login request
    const res = (await signIn('credentials', {
      email: emailRef.current,
      password: passwordRef.current,
      redirect: false,
    })) as SignInResponse;

    // Handle response
    const { error } = res;

    switch (error) {
      case 'CredentialsSignin':
        return setError('Wrong credentials, please try again.');
      case null:
        setSuccess('Successfully logged in.');

        return (window.location.pathname = '/profile');
      default:
        return setError('Something went wrong, please try again');
    }
  };

  return (
    <>
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

        {error && <p className={style.error}>{error}</p>}
        {success && <p className={style.success}>{success}</p>}
      </form>

      <Provider />
    </>
  );
};

export default Form;
