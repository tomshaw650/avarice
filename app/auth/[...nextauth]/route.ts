import NextAuth from "next-auth"
import BattleNetProvider from "next-auth/providers/battlenet";

const handler = NextAuth({
  providers: [
  ]
})

export { handler as GET, handler as POST }