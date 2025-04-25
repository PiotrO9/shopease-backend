export const productSchema = `
    type ProductVariant {
        id: String!
        productId: String!
        image: String
        variant: String
        size: String
        sku: String!
        price: Price
        inventory: Int
        createdAt: String!
        updatedAt: String!
    }

    type Product {
        id: String!
        name: String!
        description: String!
        quantity: Int!
        createdAt: String!
        updatedAt: String!
        variants: [ProductVariant!]!
    }

	type Price {
		id: String!
		productVariantId: String!
		basePrice: Float!
		salePrice: Float
		discountType: DiscountType
		discountValue: Float
		startDate: String
		endDate: String
		isActive: Boolean!
		createdAt: String!
		updatedAt: String!
	}

	enum DiscountType {
		FIXED
		PERCENTAGE
	}

    type Query {
        randomProducts(count: Int!): [Product]
    }
`;