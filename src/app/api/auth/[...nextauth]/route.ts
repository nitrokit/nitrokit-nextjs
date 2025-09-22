// import NextAuth from 'next-auth';
// import { auth } from '@/auth';

// const handler = NextAuth(auth);

// export { handler as GET, handler as POST };

import { handlers } from '@/auth';
export const { GET, POST } = handlers;
