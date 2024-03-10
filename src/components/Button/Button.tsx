'use client';

import { useFormStatus } from 'react-dom';

type PropsType = {
  children: React.ReactNode;
};

const SubmitButton = ({ children, ...props }: PropsType) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} {...props}>
      {pending ? 'Loading...' : children}
    </button>
  );
};

export default SubmitButton;
