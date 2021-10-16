export default class NHTSAStore {
  SERVER_URL = 'https://vpic.nhtsa.dot.gov';

  constructor() {


  }

  /**
   * Return the list of all makes.
   * @returns {Array} List of makes.
   */
  async getAllMakes() {
    const endPointURL = `${this.SERVER_URL}/vehicles/GetAllMakes?format=json`;
    return await fetch(endPointURL).then(
      response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }
    ).catch((error) => {
      console.warn(`Could not fetch vehicle makes. ${error}`);
    });
  }

  /** Return the list of models for a given make.
   * @param {string} makeId Id of the make for which the models are returned.
   * @returns {Array} List of models for a given make.
   */
  getModelsForMakeId(makeId) {
    return [];
  }
}