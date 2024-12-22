import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Request, Response, json } from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { authSchema } from './graphql/schema/auth';
import { userSchema } from './graphql/schema/user';
import { authResolvers } from './graphql/resolvers/auth';
import { userResolvers } from './graphql/resolvers/user';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(cors());

const server = new ApolloServer({
  typeDefs: [authSchema, userSchema],
  resolvers: [authResolvers, userResolvers],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
	await server.start();

	app.use(json());
	app.use(cookieParser());

	app.use(
		'/graphql',
		expressMiddleware(server, {
		context: async ({ req, res }: { req: Request; res: Response }) => {
			const user = req.cookies['accessToken'] ? { token: req.cookies['accessToken'] } : null;

			return { req, res, user };
		},
		})
	);

	httpServer.listen(4000, () => {
		console.log('🚀 Server ready at http://localhost:4000/graphql');
	});
}

startServer();
