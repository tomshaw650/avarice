import { type DefaultUser } from "next-auth";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: DefaultUser & {
      id: string;
      battletag: string;
      region: "EU" | "NA" | "ASIA";
    };
  }

  interface User extends DefaultUser {
    id: string;
    battletag: string;
    region: "EU" | "NA" | "ASIA";
  }
}