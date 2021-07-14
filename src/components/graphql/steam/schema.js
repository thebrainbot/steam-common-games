/**
 * Scheme for the Steam API.
 * Once settled removals/name changes should be handled carefully.
 */
const { gql } = require('apollo-server-hapi');

const schema = gql`
  type Query {
    # getPlayerSummaries(key: String!, steamids: [String]): PlayerSummariesResult
    getFriendList(key: String, steamid: String): PlayerSummariesResult
    getOwnedGames(key: String!, steamid: String!): OwnedGamesResult
  }

  type FriendListResult {
    steamid: String
    relationship: String
    friend_since: String
  }

  type PlayerSummariesResult {
    count: Int
    players: [PlayerSummary]
  }

  type PlayerSummary {
    steamid: String
    communityvisibilitystate: Int
    profilestate: Int
    personaname: String
    profileurl: String
    avatar: String
    avatarmedium: String
    avatarfull: String
    avatarhash: String
    personastate: Int
    realname: String
    primaryclanid: String
    timecreated: Int
    personastateflags: Int
    country: String
    state: String
    city: Int
  }

  type OwnedGamesResult {
    appid: Int
    name: String
    img_icon_url: String
    img_logo_url: String
  }

  type AppDetails {
    type: String
    name: String
    steam_appid: Int
    required_age: String
    is_free: Boolean
    controller_support: String
    dlc: [Int]
    detailed_description: String
    about_the_game: String
    short_description: String
    supported_languages: String
    header_image: String
    website: String
    developers: [String]
    publishers: [String]
    categories: [Categories]
    genres: [Genres]
  }

  type Categories {
    id: Int
    description: String
  }

  type Genres {
    id: Int
    description: String
  }
`;

module.exports = schema;
