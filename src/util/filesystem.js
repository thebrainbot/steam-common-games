const { lstatSync, readdirSync } = require('fs');
const { basename, join } = require('path');

// @see https://stackoverflow.com/a/24594123/38408
const isDirectory = source => lstatSync(source).isDirectory();

// @see https://stackoverflow.com/a/24594123/38408
const getDirectoryPaths = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);

const getDirectoryNames = source =>
  getDirectoryPaths(source).map(item => basename(item));

module.exports.getDirectorPaths = getDirectoryPaths;
module.exports.getDirectoryNames = getDirectoryNames;
