import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url} = await startStandaloneServer(server, {
  listen: { port: 4000 },
}); 

console.log("Is using Prisma:", process.env.USE_PRISMA);

console.log(`🚀 Server ready at: ${url}`);