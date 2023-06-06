import NextAuth from "next-auth"
import BattleNetProvider from "next-auth/providers/battlenet";
import { env } from "env"

const handler = NextAuth({
  providers: [
    BattleNetProvider({
      clientId: env.BATTLENET_CLIENT_ID,
      clientSecret: env.BATTLENET_CLIENT_SECRET,
      issuer: "https://eu.battle.net/oauth",
    })
  ]
})

export { handler as GET, handler as POST }