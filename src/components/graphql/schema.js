/**
 * GraphQL API Schema Config
 *
 * Parent schema control for all GraphQL interfaces. If adding additional
 * schema and resolver sets, refer to using 'merge-graphql-schemas'.
 *
 */

const { makeExecutableSchema } = require('apollo-server-hapi');
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const { schema: steamSchema, resolvers: steamResolvers } = require('./steam');

const typeDefs = mergeTypes([steamSchema]);
const resolvers = mergeResolvers([steamResolvers]);

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
