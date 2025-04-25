import { PrismaClient } from '@prisma/client';
import { createPriceForVariant } from './priceHelper';

const prisma = new PrismaClient();

const sizes = ["XS", "S", "M", "L", "XL"];

const products = [
    {
        name: "Basic T-Shirt",
        categoryPath: ["Clothing", "T-Shirts", "Basic T-Shirts"],
        variants: [
            { name: "Red", baseSku: "TSH-BAS-0001", image: "https://i.postimg.cc/x8LkK7Tb/TSH-SRT-0001.webp" },
            { name: "Black", baseSku: "TSH-BAS-0002", image: "https://i.postimg.cc/59zFdHqN/TSH-SRT-0002.webp" },
            { name: "White", baseSku: "TSH-BAS-0003", image: "https://i.postimg.cc/WbPq22Xm/TSH-SRT-0003.webp" },
            { name: "Brown", baseSku: "TSH-BAS-0004", image: "https://i.postimg.cc/DydJ0tM9/TSH-SRT-0004.webp" }
        ]
    },
    {
        name: "Graphic T-Shirt",
        categoryPath: ["Clothing", "T-Shirts", "Graphic T-Shirts"],
        variants: [
            { name: "Black", baseSku: "TSH-GRA-0001", image: "https://i.postimg.cc/59zFdHqN/TSH-SRT-0002.webp" },
            { name: "White", baseSku: "TSH-GRA-0002", image: "https://i.postimg.cc/WbPq22Xm/TSH-SRT-0003.webp" }
        ]
    },
    {
        name: "Casual Shirt",
        categoryPath: ["Clothing", "Shirts", "Casual Shirts"],
        variants: [
            { name: "Blue", baseSku: "SHT-CAS-0001", image: "https://i.postimg.cc/jDqMBxLz/category-image-shirt.webp" },
            { name: "White", baseSku: "SHT-CAS-0002", image: "https://i.postimg.cc/jDqMBxLz/category-image-shirt.webp" }
        ]
    },
    {
        name: "Formal Shirt",
        categoryPath: ["Clothing", "Shirts", "Formal Shirts"],
        variants: [
            { name: "White", baseSku: "SHT-FOR-0001", image: "https://i.postimg.cc/jDqMBxLz/category-image-shirt.webp" },
            { name: "Blue", baseSku: "SHT-FOR-0002", image: "https://i.postimg.cc/jDqMBxLz/category-image-shirt.webp" }
        ]
    },
    {
        name: "Classic Coat",
        categoryPath: ["Clothing", "Jackets", "Windbreakers"],
        variants: [
            { name: "Beige", baseSku: "COT-JCK-0001", image: "https://i.postimg.cc/RFsJSfpN/COT-JCK-0001.webp" }
        ]
    },
    {
        name: "Leather Jacket",
        categoryPath: ["Clothing", "Jackets", "Leather Jackets"],
        variants: [
            { name: "Black", baseSku: "JKT-LTH-0001", image: "https://i.postimg.cc/FYPT4MLw/category-image-jacket.webp" },
            { name: "Brown", baseSku: "JKT-LTH-0002", image: "https://i.postimg.cc/FYPT4MLw/category-image-jacket.webp" }
        ]
    },
    {
        name: "Slim Fit Chinos",
        categoryPath: ["Clothing", "Pants", "Chinos"],
        variants: [
            { name: "Beige", baseSku: "PNT-CHN-0001", image: "https://i.postimg.cc/26K3RY3W/PNT-CHN-0001.webp" },
            { name: "Black", baseSku: "PNT-CHN-0002", image: "https://i.postimg.cc/26K3RY3W/PNT-CHN-0001.webp" }
        ]
    },
    {
        name: "Classic Jeans",
        categoryPath: ["Clothing", "Pants", "Jeans"],
        variants: [
            { name: "Blue", baseSku: "PNT-JNS-0001", image: "https://i.postimg.cc/3ydnJtjN/category-image-pants.webp" },
            { name: "Black", baseSku: "PNT-JNS-0002", image: "https://i.postimg.cc/3ydnJtjN/category-image-pants.webp" }
        ]
    },
    {
        name: "Formal Leather Shoes",
        categoryPath: ["Accessories", "Shoes", "Casual Shoes"],
        variants: [
            { name: "Brown", baseSku: "SHO-DRS-0003", image: "https://i.postimg.cc/cCtCdz8b/SHO-DRS-0003.webp" },
            { name: "Gray", baseSku: "SHO-DRS-0004", image: "https://i.postimg.cc/WtR3z7Gb/SHO-DRS-0004.webp" }
        ]
    },
    {
        name: "Sneakers",
        categoryPath: ["Accessories", "Shoes", "Sports Shoes"],
        variants: [
            { name: "White", baseSku: "SHO-TRN-0001", image: "https://i.postimg.cc/7Zn3vC4T/SHO-TRN-0001.webp" },
            { name: "Brown", baseSku: "SHO-TRN-0002", image: "https://i.postimg.cc/mrd7D0tL/SHO-TRN-0002.webp" }
        ]
    },
    {
        name: "Pullover Hoodie",
        categoryPath: ["Clothing", "Hoodies", "Pullover Hoodies"],
        variants: [
            { name: "Gray", baseSku: "HOD-PUL-0001", image: "https://i.postimg.cc/QBwSBcSb/category-image-hoodie.webp" },
            { name: "Black", baseSku: "HOD-PUL-0002", image: "https://i.postimg.cc/QBwSBcSb/category-image-hoodie.webp" }
        ]
    },
    {
        name: "Zip-up Hoodie",
        categoryPath: ["Clothing", "Hoodies", "Zip-up Hoodies"],
        variants: [
            { name: "Black", baseSku: "HOD-ZIP-0001", image: "https://i.postimg.cc/QBwSBcSb/category-image-hoodie.webp" },
            { name: "Navy", baseSku: "HOD-ZIP-0002", image: "https://i.postimg.cc/QBwSBcSb/category-image-hoodie.webp" }
        ]
    },
    {
        name: "Classic Watch",
        categoryPath: ["Accessories", "Watches", "Analog Watches"],
        variants: [
            { name: "Silver", baseSku: "WAT-ANA-0001", image: "https://i.postimg.cc/vgnh5DNd/category-image-watches.webp" },
            { name: "Gold", baseSku: "WAT-ANA-0002", image: "https://i.postimg.cc/vgnh5DNd/category-image-watches.webp" }
        ]
    },
    {
        name: "Digital Watch",
        categoryPath: ["Accessories", "Watches", "Digital Watches"],
        variants: [
            { name: "Black", baseSku: "WAT-DIG-0001", image: "https://i.postimg.cc/vgnh5DNd/category-image-watches.webp" },
            { name: "Blue", baseSku: "WAT-DIG-0002", image: "https://i.postimg.cc/vgnh5DNd/category-image-watches.webp" }
        ]
    },
    {
        name: "Coffee Mug Set",
        categoryPath: ["Home & Kitchen", "Cups & Mugs", "Coffee Mugs"],
        variants: [
            { name: "White", baseSku: "CUP-COF-0001", image: "https://i.postimg.cc/crBDDg4x/category-image-cups.webp" },
            { name: "Black", baseSku: "CUP-COF-0002", image: "https://i.postimg.cc/crBDDg4x/category-image-cups.webp" }
        ]
    },
    {
        name: "Tea Cup Set",
        categoryPath: ["Home & Kitchen", "Cups & Mugs", "Tea Cups"],
        variants: [
            { name: "White", baseSku: "CUP-TEA-0001", image: "https://i.postimg.cc/crBDDg4x/category-image-cups.webp" },
            { name: "Blue", baseSku: "CUP-TEA-0002", image: "https://i.postimg.cc/crBDDg4x/category-image-cups.webp" }
        ]
    }
];

async function findCategoryId(categories: any[], path: string[]): Promise<string | null> {
    let currentCategories = categories;
    let foundCategory = null;

    for (const categoryName of path) {
        foundCategory = currentCategories.find(c => c.name === categoryName);
        if (!foundCategory) return null;
        currentCategories = foundCategory.children || [];
    }

    return foundCategory.id;
}

export default async function seedProductsAndVariants(categories: any[]) {
    for (const product of products) {
        const categoryId = await findCategoryId(categories, product.categoryPath);
        if (!categoryId) {
            console.error(`Category not found for ${product.name}`);
            continue;
        }

        const createdProduct = await prisma.product.create({
            data: {
                name: product.name,
                description: `A high-quality ${product.name.toLowerCase()}, perfect for any occasion.`,
                brand: "FashionPro",
                categoryId: categoryId
            }
        });

        for (const variant of product.variants) {
            for (const size of sizes) {
                const createdVariant = await prisma.productVariant.create({
                    data: {
                        productId: createdProduct.id,
                        variant: `${variant.name} - ${size}`,
                        size: size,
                        sku: `${variant.baseSku}-${size}`,
                        inventory: Math.floor(Math.random() * 50),
                        image: variant.image
                    }
                });

                await createPriceForVariant(createdVariant.id, product.categoryPath);
            }
        }
    }
}
