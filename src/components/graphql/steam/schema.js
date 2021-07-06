/**
 * Scheme for the Steam API.
 * Once settled, removals/name changes should be handled carefully.
 */
const schema = `
  type Query {
    getFriendList(
      key: String!,
      steamid: String!,
    ): FriendListResult
    
    type FriendListResult {
      steamid: String,
      relationship: String,
      friend_since: String
    }

    getPlayerSummaries(
      key: String!,
      steamids: [String],
    ): PlayerSummariesResult

    type PlayerSummariesResult {
      count: Integer,
      players: [PlayerSummary]
    }

    type PlayerSummary {
      steamid: String,
      communityvisibilitystate: Integer,
      profilestate: Integer,
      personaname: String,
      profileurl: String,
      avatar: String,
      avatarmedium: String,
      avatarfull: String,
      avatarhash: String,
      personastate: Integer,
      realname: String,
      primaryclanid: String,
      timecreated: Integer,
      personastateflags: Integer,
      country: String,
      state: String,
      city: Integer
    }

    getOwnedGames(
      key: String!,
      steamid: String!
    ): OwnedGamesResult

    type OwnedGamesResult {
      appid: Integer,
      name: String,
      img_icon_url: String,
      img_logo_url: String,
    }

    type AppDetails {
      type: String,
      name: String,
      steam_appid: Integer,
      required_age: String,
      is_free: Boolean,
      controller_support: String,
      dlc: [Integer],
      detailed_description: String,
      about_the_game: String,
      short_description: String,
      supported_languages: String,
      header_image: String,
      website: String,
      developers: [String],
      publishers: [String],
      categories: [Categories],
      genres: [Genres]
    }

    type Categories {
      id: Integer,
      description: String
    }

    type Genres {
      id: Integer,
      description: String
    }
  }`;

module.exports = schema;
