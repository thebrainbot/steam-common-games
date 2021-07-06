jest.unmock('../src/server');
const server = require('../src/server');

describe('Server', () => {
  test('registerPlugins registers plugins', async () => {
    await server.registerAllPlugins();
    expect(Object.keys(server.instance.registrations)).toMatchSnapshot();
  });

  test('server.instance is a Hapi server', async () => {
    expect(server.instance).toBeInstanceOf(Object);
  });
});

module.exports.instance = server;
