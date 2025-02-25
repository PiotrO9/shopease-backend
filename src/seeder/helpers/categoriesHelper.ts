import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategories() {
    const categoriesData = [
        { name: 'Men Clothing' },
        { name: 'Women Clothing' },
        { name: 'Accessories' }
    ];
	
    const categories = await Promise.all(
        categoriesData.map(data => prisma.category.create({ data }))
    );

    return categories;
}