"use client";

import { MinusSquare, PlusSquare } from "lucide-react";
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
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export const AddStatButton = ({ addStat }: { addStat: () => void }) => {
  return (
    <Button type="button" variant="ghost" onClick={addStat}><PlusSquare /></Button>
  )
}

export const RemoveStatButton = ({ removeStat }: { removeStat: any }) => {
  return (
    <Button type="button" variant="ghost" onClick={removeStat}><MinusSquare /></Button>
  )
}