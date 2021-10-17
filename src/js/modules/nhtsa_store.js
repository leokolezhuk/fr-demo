import '@node_modules/regenerator-runtime/runtime';

/**
 * Implements an wrapper to the NHTSA API.
 */
export default class NHTSAStore {
  constructor() {
    this.SERVER_URL = 'https://vpic.nhtsa.dot.gov';
  }

  /**
   * Gets data from a given URL.
   * @param {String} url The URL to be used for performing a GET request.
   */
  async get(url) {
    return await fetch(url)
      .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        }
      )
      .then(response => {
        if (!response.Results) {
          throw new Error('Response had an unexcepted format.');
        }
        return response.Results;
      })
      .catch((error) => {
        console.error(`Could not fetch NHTSA data from ${url}. ${error}`);
      });
  }

  /**
   * Get the list of all makes.
   * @returns {Array[Object]} List of makes.
   */
  async getAllMakes() {
    const endPointURL = `${this.SERVER_URL}/api/vehicles/GetAllMakes?format=json`;
    return await this.get(endPointURL);
  }

  /** Get the list of models for a given make.
   * @param {String} makeId Id of the make for which the models are returned.
   * @returns {Array[Object]} List of models for a given make.
   */
  async getModelsForMakeId(makeId) {
    const endPointURL = `${this.SERVER_URL}/api/vehicles/GetModelsForMakeId/${makeId}?format=json`;
    return await this.get(endPointURL);
  }
}