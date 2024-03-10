'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

const Profile = () => {
  const {
    data: { user },
  } = useSession();

  console.log(user);

  return (
    <main>
      <h1>{user.name}</h1>

      <ul>
        <li>{user.id}</li>
        <li>{user.email}</li>
        <li>{user.role}</li>
      </ul>
    </main>
  );
};

export default Profile;
