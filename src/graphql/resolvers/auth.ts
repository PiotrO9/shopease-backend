import prisma from '../prisma/prismaClient';
import { comparePassword } from '../utils/hash';
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from '../utils/jwt';
import { Response } from 'express';
import { hashPassword } from '../utils/hash';
import { authMiddleware } from '../middlewares/authMiddleware';

export const authResolvers = {
	Mutation: {
		protectedAction: authMiddleware(async (_: any, __: any, { user }: { user: any }) => {
			return true;
		}),
		login: async (_: any, { email, password }: any, { res }: { res: Response }) => {
			const user = await prisma.user.findUnique({ where: { email } });
			if (!user || !(await comparePassword(password, user.password))) {
				throw new Error('Invalid credentials');
			}

			const accessToken = generateAccessToken({ id: user.id });
			const refreshToken = generateRefreshToken({ id: user.id });

			await prisma.refreshToken.create({
				data: {
				token: refreshToken,
				userId: user.id,
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
				},
			});

			res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 20 * 60 * 1000 });

			return true;
		},
		logout: async (_: any, __: any, { res }: { res: Response }) => {
			res.clearCookie('accessToken');
			return true;
		},
		createUser: async (_: any, { email, password, login, name }: any) => {
			const existingUser = await prisma.user.findUnique({ where: { email } });
			if (existingUser) {
			  throw new Error('User with this email already exists');
			}
	  
			const hashedPassword = await hashPassword(password);
	  
			const newUser = await prisma.user.create({
				data: {
					id: undefined,
					email,
					password: hashedPassword,
					login,
					name,
				},
			});
	  
			return newUser;
		},
		refreshToken: async (_: any, __: any, { req, res }: { req: any; res: any }) => {
			const token = req.cookies['accessToken'];
	  
			if (!token) {
			  throw new Error('No access token provided');
			}
	  
			const decoded = verifyAccessToken(token);
	  
			if (!decoded) {
			  throw new Error('Invalid or expired access token');
			}
	  
			const storedToken = await prisma.refreshToken.findFirst({
				where: { userId: decoded.id },
			});
			
			if (!storedToken) {
				throw new Error('No refresh token found');
			}

			const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email });
	  
			res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 20 * 60 * 1000 });
	  
			return true;
		},
	},
};
