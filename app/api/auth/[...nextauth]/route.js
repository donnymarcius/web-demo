import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { google } from 'googleapis';

// Authentication options
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' }, // 'mentee' or 'mentor'
      },
      async authorize(credentials) {
        const { email, password, role } = credentials;

        if (!email || !password || !role) {
          throw new Error('Email, password, and role are required');
        }

        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
        const range = role === 'mentee' ? 'mentee-account!A2:F' : 'mentor-account!A2:F';

        try {
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
          });

          const rows = response.data.values || [];
          const user = rows.find((row) => row[1] === email); // Email column

          if (!user) {
            throw new Error('User not found');
          }

          const passwordMatch = await bcrypt.compare(password, user[2]); // Password column

          if (!passwordMatch) {
            throw new Error('Invalid password');
          }

          return {
            email: user[1], // Email from sheet
            fullName: user[0], // Full name from sheet
            role,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error('Failed to authenticate');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT strategy
    maxAge: 30 * 24 * 60 * 60, // 30 days (adjust as needed)
    updateAge: 24 * 60 * 60,   // Refresh session every 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the JWT token
      if (user) {
        token.fullName = user.fullName;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add JWT token data to the session
      session.user.fullName = token.fullName;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Customize the sign-in page
  },
};

// Define the handler function for NextAuth
const handler = NextAuth(authOptions);

// Export the handler as a named export
export { handler as GET, handler as POST };
