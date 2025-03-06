import { PrismaClient } from '@prisma/client';
import { seedCategories } from './helpers/categoriesHelper';
import seedProductsAndVariants from './helpers/productHelper';

const prisma = new PrismaClient();

export const seeder = async () => {
    console.log('Clearing database...');

    await prisma.refreshToken.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.log('Database cleared successfully!');
    console.log('Seeding categories...');

    const categories = await seedCategories();
    console.log('Seeding products and variants...');

    await seedProductsAndVariants(categories);
    console.log('Database seeded successfully!');
};
