import prisma from '../prisma/prismaClient';

export const productResolvers = {
    Query: {
        randomProducts: async (_: any, { count }: { count: number }) => {
			count = Math.max(1, count);
            const totalProducts = await prisma.product.count();
            const skip = totalProducts > count ? Math.floor(Math.random() * (totalProducts -  count)) : 0;

            const randomProducts = await prisma.product.findMany({
                skip,
                take: count,
                include: {
                    variants: true,
                },
            });

            return randomProducts.map(product => ({
                ...product,
                quantity: product.variants.reduce((acc, variant) => acc + variant.inventory, 0),
            }));
        },
    },
};
