import { verifyAccessToken } from '../utils/jwt';
import { GraphQLError } from 'graphql';

export const authMiddleware = (resolver: any) => {
  return async (parent: any, args: any, context: any, info: any) => {
    const token = context.req.cookies['accessToken'];

    if (!token) {
      throw new GraphQLError('No access token provided', { extensions: { code: 'UNAUTHORIZED' } });
    }

    const decoded = verifyAccessToken(token);

    if (!decoded) {
      throw new GraphQLError('Invalid or expired access token', { extensions: { code: 'UNAUTHORIZED' } });
    }

    context.user = decoded;

    return resolver(parent, args, context, info);
  };
};
