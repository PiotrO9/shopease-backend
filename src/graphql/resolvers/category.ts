import prisma from '../prisma/prismaClient';

export const categoryResolvers = {
    Query: {
        categories: async (_: any, { where }: { where?: { parentId?: { equals: string } } }) => {
            return prisma.category.findMany({
                where: where ? {
                    parentId: where.parentId?.equals || undefined
                } : undefined,
                include: {
                    parent: true,
                    children: true,
                    products: true
                }
            });
        },
        category: async (_: any, { id }: { id: string }) => {
            return prisma.category.findUnique({
                where: { id },
                include: {
                    parent: true,
                    children: true,
                    products: true
                }
            });
        }
    }
}; 