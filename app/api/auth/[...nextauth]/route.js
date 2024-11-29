import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import Whitelist from "@models/whitelist";
import { connectToDB } from "@utils/database";


const alumni = "g@alumni.bits-pilani.ac.in";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session.user.email });
			session.user.id = sessionUser._id.toString();

			return session;
		},
		async signIn({ account, profile }) {
			try {
				await connectToDB();
		
				const emailToCheck = profile.email.toLowerCase();
				
				// Check if email matches allowed patterns
				const isAllowedBatch = (
					emailToCheck.match(/^f2020.*@.*bits-pilani\.ac\.in/) ||
					emailToCheck.match(/^f2021.*@.*bits-pilani\.ac\.in/) ||
					emailToCheck.match(/^h2023.*@.*bits-pilani\.ac\.in/) ||
					emailToCheck.includes('@alumni.bits-pilani.ac.in')
				);

				// Comment out whitelist check temporarily
				// const isWhitelisted = await Whitelist.exists({ email: emailToCheck });
				
				if (isAllowedBatch) {
					const userExists = await User.findOne({ email: emailToCheck });
		
					if (!userExists) {
						await User.create({
							email: emailToCheck,
							username: profile.name,
							image: profile.picture,
						});
					}
		
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.log("Error checking if user exists: ", error.message);
				return false;
			}
		},		
	},
});

export { handler, handler as GET, handler as POST };
