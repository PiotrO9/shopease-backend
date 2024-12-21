import prisma from '../prisma/prismaClient';

export const userResolvers = {
	Query: {
		currentUser: async (_: any, __: any, { user }: { user: any }) => {
		if (!user) throw new Error('Not authenticated');
		return prisma.user.findUnique({ where: { id: user.id } });
		},
	},
};
