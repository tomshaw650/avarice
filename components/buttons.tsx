"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface ProfileButtonProps {
  image: string;
  initials: string;
}

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

export const ProfileButton: React.FC<ProfileButtonProps> = ({ image, initials }) => {
  return (
    <Link href="/profile">
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </Link>
  );
};