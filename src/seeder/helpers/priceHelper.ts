import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type PriceRange = {
    min: number;
    max: number;
};

type PriceRanges = {
    [key: string]: PriceRange;
};

const priceRanges: PriceRanges = {
    'T-Shirts': { min: 15, max: 35 },
    'Shirts': { min: 25, max: 45 },
    'Jackets': { min: 50, max: 120 },
    'Pants': { min: 30, max: 60 },
    'Shoes': { min: 40, max: 100 },
    'Hoodies': { min: 35, max: 65 },
    'Watches': { min: 80, max: 200 },
    'Cups & Mugs': { min: 10, max: 25 }
};

function getBasePriceForCategory(categoryPath: string[]): number {
    for (let i = categoryPath.length - 1; i >= 0; i--) {
        const category = categoryPath[i];
        if (priceRanges[category]) {
            const { min, max } = priceRanges[category];
            return parseFloat((Math.random() * (max - min) + min).toFixed(2));
        }
    }
    
    return parseFloat((Math.random() * (50 - 20) + 20).toFixed(2));
}

export async function createPriceForVariant(variantId: string, categoryPath: string[]) {
    const basePrice = getBasePriceForCategory(categoryPath);
    
    return prisma.price.create({
        data: {
            productVariantId: variantId,
            basePrice: basePrice,
            isActive: true
        }
    });
} 