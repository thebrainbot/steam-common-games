jest.unmock('../src/plugins');
const plugins = require('../src/plugins');

describe('Plugins', () => {
  test('should have known loading phases', async () => {
    expect(Object.keys(plugins)).toMatchSnapshot();
  });
});
