/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthOptions } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function handler(req: any, res: any) {
  return await NextAuth(req, res, authOptions as AuthOptions);
}
