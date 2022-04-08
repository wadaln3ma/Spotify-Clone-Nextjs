import NextAuth from "next-auth"

import SpotifyProvider from "next-auth/providers/spotify"

import SpotifyAPI, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token) {
  try {
    SpotifyAPI.setAccessToken(token.accessToken)
    SpotifyAPI.setAccessToken(token.refreshToken)

    const { body: refreshedToken } = await SpotifyAPI.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    // OAuth authentication providers
    SpotifyProvider({
      clientId: process.env.NEXT_AUTH_CLIENT_ID,
      clientSecret: process.env.NEXT_AUTH_CLIENT_SECRET,
      authorization : LOGIN_URL,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initil Sign In
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // Return previous token if the access token hasn't expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access Token expired, so refresh it...token
      return await refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username

      return session
    },
  },
})
