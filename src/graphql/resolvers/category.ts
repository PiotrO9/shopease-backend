import prisma from '../prisma/prismaClient';

export const categoryResolvers = {
    Query: {
        categories: async () => {
            return prisma.category.findMany({
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