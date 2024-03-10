import { options } from '@/app/(auth)/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <nav>
      <h2>E-commerce</h2>

      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/public'}>Public</Link>
        </li>
        <br />

        {session ? (
          <>
            <li>
              <Link href={'/api/auth/signout?callbackUrl=/'}>Logout</Link>
            </li>
            <li>
              <Link href={'/profile'}>Profile</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={'/register'}>Register</Link>
            </li>
            <li>
              <Link href={'/api/auth/signin'}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
