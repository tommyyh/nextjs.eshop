import { options } from '@/app/(auth)/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import Logout from './Logout';
import Login from './Login';

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
            <Logout />
            <li>
              <Link href={'/profile'}>Profile</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={'/register'}>Register</Link>
            </li>
            <Login />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
