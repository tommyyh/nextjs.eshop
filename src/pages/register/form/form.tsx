'use client';
import { register } from '@/api/user';
import style from './form.module.scss';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import SubmitButton from '@/components/Button/Button';

const initialState = {
  error: '',
};

const Form = () => {
  const [state, formAction] = useFormState(register, initialState);
  const [formClass, setFormClass] = useState('');

  useEffect(() => {
    if (state?.error) {
      setFormClass(style.error);
    }
  }, [state?.error]);

  return (
    <form
      action={formAction}
      className={formClass}
      onFocus={() => setFormClass('')}
    >
      <div>
        <input type="text" name="name" placeholder="Name" />
      </div>
      <div>
        <select name="role" id="role">
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <input type="email" name="email" placeholder="Email Address" />
      </div>
      <div>
        <input type="password" name="password" placeholder="Password" />
      </div>

      <SubmitButton>Register</SubmitButton>

      {formClass && <p className={style.errorMessage}>{state.error}</p>}
    </form>
  );
};

export default Form;
