import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import Providers from "next-auth/providers";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
		}),
		
		
	],

	// callbacks: {
	// 	async session(session, user) {
	// 	  // This callback is called whenever a session is accessed.
	// 	  // You can add custom properties to the session object here.
	// 	  // For example, adding the user's email to the session:
	// 	  session.user.email = user.email;
	// 	  return session;
	// 	},

});
