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
                    variants: {
                        include: {
                            price: true
                        }
                    }
                },
            });

            return randomProducts.map(product => ({
                ...product,
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString(),
                quantity: product.variants.reduce((acc, variant) => acc + variant.inventory, 0),
                variants: product.variants.map(variant => ({
                    ...variant,
                    createdAt: variant.createdAt.toISOString(),
                    updatedAt: variant.updatedAt.toISOString(),
                    price: variant.price ? {
                        basePrice: variant.price.basePrice,
                        salePrice: variant.price.salePrice,
                        discountType: variant.price.discountType,
                        discountValue: variant.price.discountValue,
                        startDate: variant.price.startDate?.toISOString(),
                        endDate: variant.price.endDate?.toISOString(),
                        isActive: variant.price.isActive,
                        createdAt: variant.price.createdAt.toISOString(),
                        updatedAt: variant.price.updatedAt.toISOString()
                    } : null
                }))
            }));
        },
    },
};
