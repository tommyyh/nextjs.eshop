import Link from 'next/link';
import React from 'react';

const Error = () => {
  return (
    <main>
      <h1>Error with signing in. Please go back and try again</h1>

      <Link href={'/login'}>Back to login</Link>
    </main>
  );
};

export default Error;
