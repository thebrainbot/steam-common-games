/**
 * GraphQL API Schema
 *
 * Parent schema control for all GraphQL interfaces. If adding additional
 * schema and resolver sets, refer to using 'merge-graphql-schemas'.
 *
 */

const { makeExecutableSchema } = require('apollo-server-hapi');

const { schema: steamSchema, resolvers: steamResolvers } = require('./steam');

module.exports = makeExecutableSchema({
  steamSchema,
  steamResolvers,
});
