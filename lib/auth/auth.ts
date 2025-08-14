import {
    betterAuth
} from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/db/prisma';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    session: {
        storeSessionInDatabase: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }
    },
    plugins: [
        nextCookies()
    ]
});