export default class NHTSAStore {
  constructor() {
    this.SERVER_URL = 'https://vpic.nhtsa.dot.gov';
  }

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
   * Return the list of all makes.
   * @returns {Array} List of makes.
   */
  async getAllMakes() {
    const endPointURL = `${this.SERVER_URL}/api/vehicles/GetAllMakes?format=json`;
    return await this.get(endPointURL);
  }

  /** Return the list of models for a given make.
   * @param {string} makeId Id of the make for which the models are returned.
   * @returns {Array} List of models for a given make.
   */
  async getModelsForMakeId(makeId) {
    const endPointURL = `${this.SERVER_URL}/api/vehicles/GetModelsForMakeId/${makeId}?format=json`;
    return await this.get(endPointURL);
  }
}