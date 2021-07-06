/**
 * Mapping helpers for the steam graphql API.
 * These will essentially be useful for massaging data from the result data into the graphql
 * scheme format.
 */

const mapPlayerSummary = ({
  steamid,
  communityvisibilitystate,
  profilestate,
  personaname,
  profileurl,
  avatar,
  avatarmedium,
  avatarfull,
  avatarhash,
  personastate,
  realname,
  primaryclanid,
  timecreated,
  personastateflags,
  loccountrycode,
  locstatecode,
  loccityid,
}) => ({
  steamid,
  communityvisibilitystate,
  profilestate,
  personaname,
  profileurl,
  avatar,
  avatarmedium,
  avatarfull,
  avatarhash,
  personastate,
  realname,
  primaryclanid,
  timecreated,
  personastateflags,
  country: loccountrycode,
  state: locstatecode,
  city: loccityid,
});

module.exports.playerSummaries = response => ({
  count: response.length,
  players: mapPlayerSummary(response),
});

/**
 * TODO: multiple owned games formatters
 */
