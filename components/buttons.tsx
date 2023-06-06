"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn("google")}>
      Sign in
    </Button>
  );
};
export const LogoutButton = () => {
  return (
    <Button onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};