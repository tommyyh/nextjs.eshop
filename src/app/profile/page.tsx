"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { data } = useSession();

  useEffect(() => {
    if (data?.user) {
      setUser(data?.user);
      setLoading(false);
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;

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
