const fetch = require('node-fetch');
const config = require('config');
/**
 * Steam API Service functions
 *
 * Any methods / calls to the Steam API should be handled here.
 * Caching of data needs to be handled as well. Client sides should also leverage memoizations to reduce
 * calls to the API.
 */

/**
 * Requests the friends list from steam. Only useable as a GET
 * request and requires the users steam key and id.
 *
 * @param {String} steamKey Users steam key
 * @param {String} steamId Users steam id
 * @returns
 */
const requestFriendList = async (steamKey, steamId) => {
  const endpointUrl = config.secrets.steam_api_url;
  const response = await fetch(
    `${endpointUrl}/ISteamUser/GetFriendList/v001/?steamkey=${steamKey}&steamid=${steamId}&relationship=friend`,
  );
  if (!response.ok) {
    throw new Error(
      `Error returned from Steam API - ISteamUser/GetFriendList ${response.status}`,
    );
  }
  return response.json();
};

const chunkSteamIds = data => {
  const chunks = [];
  const chunkSize = 100;
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }
  return chunks;
};

/**
 * Used to make the functional calls to the API to retrieve profile data for the given
 * user ids.
 *
 * @param {String} steamKey Users steam key
 * @param {Array} idList List of steam ids
 * @returns
 */
const playerSummariesRequest = async (steamKey, idList) => {
  const endpointUrl = config.secrets.steam_api_url;

  const response = await fetch(
    `${endpointUrl}/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${idList}`,
  );

  if (!response.ok) {
    throw new Error(
      `Error returned from Steam API - ISteamUser/GetPlayerSummaries ${response.status}`,
    );
  }

  const jsonData = response.json();
  return jsonData.response.players;
};
/**
 * This gets details for steam friends. The API call can only handle a maximum of 100 steam
 * ids on the request, so we batch the calls if needed and combine to a single list
 *
 * @param {String} steamKey Users steam key
 * @param {Array} steamIds List of steam IDs
 * @returns
 */
const requestPlayerSummaries = (steamKey, steamIds) => {
  if (!steamIds || steamIds.length === 0) {
    throw new Error(`Error: No friends returned from Steam`);
  }
  const chunkedSteamIds = chunkSteamIds(steamIds);
  const friendData = [];

  chunkedSteamIds.forEach(steamids => {
    const idList = steamids.join(',');
    friendData.push(playerSummariesRequest(steamKey, idList));
  });
  return friendData;
};

/**
 * Requests a users owned games.
 *
 * @param {String} steamKey Users steam key
 * @param {String} steamId A users Steam ID
 * @returns
 */
const requestOwnedGames = async (steamKey, steamId) => {
  const endpointUrl = config.secrets.steam_api_url;

  const response = await fetch(
    `${endpointUrl}/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${steamId}&format=json&include_appinfo=true`,
  );

  if (!response.ok) {
    throw new Error(
      `Error returned from Steam API - IPlayerService/GetOwnedGames ${response.status}`,
    );
  }
  return response.json();
};

/**
 * Since a single call cannot be made to get a list of common games or even a single call to get
 * list of owned games for several users, we have to make multiple calls. This essentially is
 * just a helper function that calls the API multiple ti mes and returns a full set of data.
 *
 * @param {String} steamKey Users steam key
 * @param {Array} steamIds List of steam IDs
 * @returns
 */
const requestMultiOwnedGames = async (steamKey, steamIds) => {
  const ownedGames = {};
  steamIds.forEach(steamId => {
    const response = requestOwnedGames(steamKey, steamId);
    ownedGames[steamId] = response.response;
  });
  return ownedGames;
};

module.exports.requestFriendList = requestFriendList;
module.exports.requestPlayerSummaries = requestPlayerSummaries;
module.exports.requestOwnedGames = requestOwnedGames;
module.exports.requestMultiOwnedGames = requestMultiOwnedGames;
