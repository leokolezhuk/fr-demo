import NHTSAStore from '@modules/nhtsa_store';

describe('NHTSA Store', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    global.fetch.mockReturnValue(["Shit1"]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when all makes are requested', () => {
    it('should return the correct result', async () => {
      let nhtsaStore = new NHTSAStore();
      let makes = await nhtsaStore.getAllMakes();
      console.error(`MAKES: `+makes);
      expect(makes).toBeDefined();
    });
  });

});
