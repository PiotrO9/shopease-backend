import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategories() {
    const topCategoriesData = [
        {
            name: 'Clothing',
            image: 'https://i.postimg.cc/V0BFHpwG/category-image-tshirt.webp',
            children: {
                create: [
                    {
                        name: 'T-Shirts',
                        image: 'https://i.postimg.cc/V0BFHpwG/category-image-tshirt.webp',
                        children: {
                            create: [
                                { name: 'Basic T-Shirts' },
                                { name: 'Graphic T-Shirts' }
                            ]
                        }
                    },
                    {
                        name: 'Shirts',
                        image: 'https://i.postimg.cc/jDqMBxLz/category-image-shirt.webp',
                        children: {
                            create: [
                                { name: 'Casual Shirts' },
                                { name: 'Formal Shirts' }
                            ]
                        }
                    },
                    {
                        name: 'Pants',
                        image: 'https://i.postimg.cc/3ydnJtjN/category-image-pants.webp',
                        children: {
                            create: [
                                { name: 'Jeans' },
                                { name: 'Chinos' }
                            ]
                        }
                    },
                    {
                        name: 'Jackets',
                        image: 'https://i.postimg.cc/FYPT4MLw/category-image-jacket.webp',
                        children: {
                            create: [
                                { name: 'Leather Jackets' },
                                { name: 'Windbreakers' }
                            ]
                        }
                    },
                    {
                        name: 'Hoodies',
                        image: 'https://i.postimg.cc/QBwSBcSb/category-image-hoodie.webp',
                        children: {
                            create: [
                                { name: 'Pullover Hoodies' },
                                { name: 'Zip-up Hoodies' }
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'Accessories',
            image: 'https://i.postimg.cc/vgnh5DNd/category-image-watches.webp',
            children: {
                create: [
                    {
                        name: 'Watches',
                        image: 'https://i.postimg.cc/vgnh5DNd/category-image-watches.webp',
                        children: {
                            create: [
                                { name: 'Digital Watches' },
                                { name: 'Analog Watches' }
                            ]
                        }
                    },
                    {
                        name: 'Shoes',
                        image: 'https://i.postimg.cc/sGRcmykG/category-image-shoes.webp',
                        children: {
                            create: [
                                { name: 'Casual Shoes' },
                                { name: 'Sports Shoes' }
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'Home & Kitchen',
            image: 'https://i.postimg.cc/crBDDg4x/category-image-cups.webp',
            children: {
                create: [
                    {
                        name: 'Cups & Mugs',
                        image: 'https://i.postimg.cc/crBDDg4x/category-image-cups.webp',
                        children: {
                            create: [
                                { name: 'Coffee Mugs' },
                                { name: 'Tea Cups' }
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
