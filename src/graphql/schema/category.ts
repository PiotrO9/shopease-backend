export const categorySchema = `
    type Category {
        id: String!
        name: String!
        image: String
        parentId: String
        parent: Category
        children: [Category!]!
        products: [Product!]!
    }

    input CategoryWhereInput {
        parentId: StringFilter
    }

    input StringFilter {
        equals: String
        not: String
        in: [String!]
        notIn: [String!]
        contains: String
        startsWith: String
        endsWith: String
    }

    type Query {
        categories(where: CategoryWhereInput): [Category!]!
        category(id: String!): Category
    }
`; 