import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { clientPromise } from "@/dbConnect";

export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	providers: [Google],
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id;
			return session;
		},
	},
});
