# steam-common-games

Service to find common games among steam friends

This is an early project that is going to provide the GraphQL/API capabilities for the Steam calls and some simple React components for web rendering. This is in the very early stages of configuring the code base and making scaffolding changes. Some assumptions are being made and testing will come in place after initial calls are successful.

## Why?

It is incredibly annoying that Steam does not have a built in utility to allow users to find common gmaes among their friends. Figured if the API can support it, it shouldn't be terribly hard. However, I'm currently unsure how many calls can be made to this API before getting cut off by steam.

## Steam API Key issues

One major drawback is that Steam requires a TIN in order to properly access their API. Otherwise, a user has to generate their own API key and know their inernal Steam ID (not their usernames). This is definitely a show stopper for a real prodct, but can be worked around for a prototype. Only with a TIN can we get access to an actual Steam login and hopefully better API.
