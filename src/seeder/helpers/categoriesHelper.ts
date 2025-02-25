import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategories() {
    const topCategoriesData = [
        {
            name: 'Men Clothing',
            children: {
                create: [
                    {
                        name: 'Shirts',
                        children: {
                            create: [
                                { name: 'Casual Shirts' },
                                { name: 'Formal Shirts' }
                            ]
                        }
                    },
                    {
                        name: 'Pants',
                        children: {
                            create: [
                                { name: 'Jeans' },
                                { name: 'Chinos' }
                            ]
                        }
                    },
                    {
                        name: 'Jackets',
                        children: {
                            create: [
                                { name: 'Leather Jackets' },
                                { name: 'Windbreakers' }
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'Women Clothing',
            children: {
                create: [
                    {
                        name: 'Dresses',
                        children: {
                            create: [
                                { name: 'Evening Dresses' },
                                { name: 'Casual Dresses' }
                            ]
                        }
                    },
                    {
                        name: 'Tops',
                        children: {
                            create: [
                                { name: 'Blouses' },
                                { name: 'T-Shirts' }
                            ]
                        }
                    },
                    {
                        name: 'Skirts',
                        children: {
                            create: [
                                { name: 'Mini Skirts' },
                                { name: 'Long Skirts' }
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'Accessories',
            children: {
                create: [
                    {
                        name: 'Bags',
                        children: {
                            create: [
                                { name: 'Handbags' },
                                { name: 'Backpacks' }
                            ]
                        }
                    },
                    {
                        name: 'Hats',
                        children: {
                            create: [
                                { name: 'Baseball Caps' },
                                { name: 'Beanies' }
                            ]
                        }
                    },
                    {
                        name: 'Jewelry',
                        children: {
                            create: [
                                { name: 'Necklaces' },
                                { name: 'Bracelets' }
                            ]
                        }
                    }
                ]
            }
        }
    ];

    const categories = await Promise.all(
        topCategoriesData.map(data =>
            prisma.category.create({
                data,
                include: {
                    children: {
                        include: {
                            children: true
                        }
                    }
                }
            })
        )
    );

    return categories;
}
