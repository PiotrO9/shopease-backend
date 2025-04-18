import prisma from '../prisma/prismaClient';

export const categoryResolvers = {
    Query: {
        categories: async (_: any, { where }: { where?: { parentId?: { equals: string | null } } }) => {
            return prisma.category.findMany({
                where: where ? {
                    parentId: where.parentId?.equals === null ? null : where.parentId?.equals || undefined
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
        },
        subcategories: async (_: any, { parentIds }: { parentIds: string[] }) => {
            const existingCategories = await prisma.category.findMany({
                where: {
                    id: {
                        in: parentIds
                    }
                },
                select: {
                    id: true
                }
            });

            const existingCategoryIds = new Set(existingCategories.map(category => category.id));
            const errors: string[] = [];

            parentIds.forEach(id => {
                if (!existingCategoryIds.has(id)) {
                    errors.push(`Category with ID ${id} does not exist`);
                }
            });

            if (errors.length > 0) {
                const categories = await prisma.category.findMany({
                    where: {
                        parentId: {
                            in: Array.from(existingCategoryIds)
                        }
                    },
                    include: {
                        parent: true,
                        children: true,
                        products: true
                    }
                });

                return {
                    categories,
                    errors
                };
            }

            const categories = await prisma.category.findMany({
                where: {
                    parentId: {
                        in: parentIds
                    }
                },
                include: {
                    parent: true,
                    children: true,
                    products: true
                }
            });

            return {
                categories,
                errors: []
            };
        }
    }
}; 