import jwt, { JwtPayload } from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

export const generateAccessToken = (payload: object): string =>
  jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

export const generateRefreshToken = (payload: object): string =>
  jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

export const verifyAccessToken = (token: string): JwtPayload | null => {
	try {
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
		return decoded;
	} catch {
		return null;
	}
};

export const verifyRefreshToken = (token: string): JwtPayload | null => {
	try {
		const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
		if (typeof decoded === 'string') {
		return null;
		}
		return decoded as JwtPayload;
	} catch {
		return null;
	}
};
