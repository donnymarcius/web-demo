import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { google } from 'googleapis';

export const runtime = 'nodejs'; // Explicitly set Node.js runtime

const handler = NextAuth({
    providers: [
        CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
            role: { label: 'role', type: 'text' }, // 'mentee' or 'mentor'
        },
        
        async authorize(credentials) {
            console.log('Starting authorization process...');
            const { email, password, role } = credentials;
            console.log('Credentials received:', { email, role });
    
            if (!email || !password || !role) {
            throw new Error('Email, password, and role are required');
            }
            console.log('Input OK');
    
            const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            console.log('GoogleAuth OK', process.env.GOOGLE_SHEETS_CLIENT_EMAIL, process.env.NEXTAUTH_URL);
    
            const sheets = google.sheets({ version: 'v4', auth });
            const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
            const range = role === 'mentee' ? 'mentee-account!A2:F' : 'mentor-account!A2:F';
            console.log('Google Sheets spreadsheetId:', process.env.GOOGLE_SHEETS_SPREADSHEET_ID);

            try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
            console.log('Sheet response OK');
    
            const rows = response.data.values || [];
            const user = rows.find((row) => row[1] === email); // Email column
            console.log('user', user)
    
            if (!user) {
                throw new Error('User not found');
            }
            console.log('Found email OK');
    
            const passwordMatch = await bcrypt.compare(password, user[2]); // Password column
    
            if (!passwordMatch) {
                throw new Error('Invalid password');
            }
            console.log('Password match OK');
    
            return {
                email: user[1], // Email from sheet
                role,
            };
            } catch (error) {
            console.error('Authentication error:', error.message, error.stack);
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
});

export { handler as GET, handler as POST };