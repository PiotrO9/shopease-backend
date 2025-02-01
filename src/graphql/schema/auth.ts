export const authSchema = `
	type Mutation {
		login(email: String!, password: String!): Boolean
		logout: Boolean
		createUser(email: String!, password: String!, login: String!, name: String!): User
		refreshToken: Boolean
		protectedAction: Boolean
	}
`;