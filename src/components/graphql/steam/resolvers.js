const { GraphQLError } = require('graphql');
const steamAPI = require('../../../services/steam/steamRequest');
const mapper = require('./mapper');

/**
 * GraphQL Resolvers. handles processing the Query endpoints and mapping data.
 */
const resolvers = {
  Query: {
    async getFriendList(root, args) {
      try {
        const { key, steamid } = args;
        if (!key || key.length === 0) {
          return new GraphQLError('Argument "key" cannot be empty');
        }
        if (!steamid || steamid.length === 0) {
          return new GraphQLError('Argument "steamid" cannot be empty');
        }
        const friendsResponse = await steamAPI.requestFriendList(key, steamid);
        const { friends = {} } = friendsResponse.friendslist;
        const steamIds = friends.map(elem => elem.steamid);

        const playerSummaries = await steamAPI.requestPlayerSummaries(
          key,
          steamIds,
        );
        return mapper.mapPlayerSummariesResults(playerSummaries);
      } catch (err) {
        return new GraphQLError(err.message);
      }
    },
    async getOwnedGames(root, args) {
      try {
        const { key, steamid } = args;
        if (!key || key.length === 0) {
          return new GraphQLError('Argument "key" cannot be empty');
        }
        if (!steamid || steamid.length === 0) {
          return new GraphQLError('Argument "steamid" cannot be empty');
        }
        const ownedGamesResponse = await steamAPI.requestOwnedGames(
          key,
          steamid,
        );
        return mapper.mapOwnedGames(ownedGamesResponse);
      } catch (err) {
        return new GraphQLError(err.message);
      }
    },
    // async getCommonGames(root, args) {
    //   try {
    //     const { key, steamids } = args;
    //     if (!key || key.length === 0) {
    //       return new GraphQLError('Argument "key" cnanot be empty');
    //     }
    //     if (!steamids || steamids.length < 2) {
    //       return new GraphQLError(
    //         'Argument "steamids" requires at least 2 entries',
    //       );
    //     }
    //     const ownedGamesResponses = await steamAPI.requestMultiOwnedGames(
    //       key,
    //       steamids,
    //     );
    //     return mapper.mapCommonGames(ownedGamesResponses);
    //   } catch (err) {
    //     return new GraphQLError(err.message);
    //   }
    // },
  },
};

module.exports = resolvers;
