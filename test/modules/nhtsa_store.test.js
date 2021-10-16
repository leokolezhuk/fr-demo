import NHTSAStore from '@modules/nhtsa_store';

describe('NHTSA Store', () => {
  let nhtsaStore;
  beforeEach(() => {
    nhtsaStore = new NHTSAStore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when making a GET request to the API endpoint', () => {
    it('should parse the response correctly', async () => {
      global.fetch = jest.fn((url) =>
        Promise.resolve({
          status: 200,
          ok: true,
          statusText: 'OK',
          redirected: false,
          json: () => Promise.resolve({
            Count: 3,
            Results: [
              { a: 1 },
              { b: 2 },
              { c: 3 },
            ],
            Message: "Response returned successfully",
          })
        })
      );

      const response = await nhtsaStore.get('testApiURL');

      expect(response).toBeDefined();
      expect(response).toHaveLength(3);
      expect(response[0].a).toBe(1);
      expect(response[1].b).toBe(2);
      expect(response[2].c).toBe(3);
    });
    it('should log an error if the request is unsuccessful', async () => {
      global.fetch = jest.fn((url) =>
        Promise.resolve({
          status: 404,
          ok: false,
          statusText: 'Test status text',
          redirected: false,
        })
      );
      console.error = jest.fn();

      const response = await nhtsaStore.get('testApiURL');

      expect(response).not.toBeDefined();
      const expectedErrorMessage = 'Error: Test status text';
      const expectedLogMessage =
        `Could not fetch NHTSA data from testApiURL. ${expectedErrorMessage}`;
      expect(console.error).toHaveBeenCalledWith(expectedLogMessage);
    });
    it('should log an error if the response has an unexpected format', async () => {
      global.fetch = jest.fn((url) =>
        Promise.resolve({
          status: 200,
          ok: true,
          statusText: 'OK',
          redirected: false,
          json: () => Promise.resolve({
            TestProperty1: 'testvalue',
          })
        })
      );
      console.error = jest.fn();

      const response = await nhtsaStore.get('testApiURL');

      expect(response).not.toBeDefined();
      const expectedErrorMessage = 'Error: Response had an unexcepted format.';
      const expectedLogMessage =
        `Could not fetch NHTSA data from testApiURL. ${expectedErrorMessage}`;
      expect(console.error).toHaveBeenCalledWith(expectedLogMessage);
    });
  });

  describe('when all makes are requested', () => {
    it('should return the correct result', async () => {
      const nhtsaStoreSpy = jest.spyOn(nhtsaStore, 'get')
        .mockImplementation(() => Promise.resolve(['A', 'B', 'C']));

      const makes = await nhtsaStore.getAllMakes();

      expect(makes).toBeDefined();
      expect(makes).toHaveLength(3);
      const expectedApiUrl = `${nhtsaStore.SERVER_URL}/api/vehicles/GetAllMakes?format=json`;
      expect(nhtsaStoreSpy).toHaveBeenCalledTimes(1);
      expect(nhtsaStoreSpy).toHaveBeenCalledWith(expectedApiUrl);
    });
  });

  describe('when the models of a make are requested', () => {
    it('should return the correct result', async () => {
      const nhtsaStoreSpy = jest.spyOn(nhtsaStore, 'get')
        .mockImplementation(() => Promise.resolve(['A', 'B', 'C']));

      const makes = await nhtsaStore.getModelsForMakeId(123);

      expect(makes).toBeDefined();
      expect(makes).toHaveLength(3);
      const expectedApiUrl =
        `${nhtsaStore.SERVER_URL}/api/vehicles/GetModelsForMakeId/123?format=json`;
      expect(nhtsaStoreSpy).toHaveBeenCalledTimes(1);
      expect(nhtsaStoreSpy).toHaveBeenCalledWith(expectedApiUrl);
    });
  });
});
